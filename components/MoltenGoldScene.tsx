'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { PMREMGenerator } from 'three'
import gsap from 'gsap'

const LERP_FACTOR = 0.06
const GOLD_COLOR = 0xc5a059
const EMERALD_COLOR = 0x01160d
const PARTICLE_COUNT = 350
const SILK_THREAD_COUNT = 60

// Simplex-like 3D noise for vertex displacement
const SNOISE_GLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.min(1, t)
}

export default function MoltenGoldScene({
  containerRef,
  onError,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>
  onError?: () => void
}) {
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const silkLinesRef = useRef<{ curve: THREE.CatmullRomCurve3; line: THREE.Line }[]>([])
  const silkOriginalsRef = useRef<THREE.Vector3[][]>([])
  const spotLightRef = useRef<THREE.SpotLight | null>(null)
  const frameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const disperseRef = useRef(0)
  const particlePositionsRef = useRef<Float32Array | null>(null)
  const particleOriginsRef = useRef<Float32Array | null>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width * 2 - 1
      mouseRef.current.targetY = -((e.clientY - rect.top) / rect.height * 2 - 1)
    },
    [containerRef]
  )

  const handleMouseDown = useCallback(() => {
    gsap.to(disperseRef, {
      current: 1,
      duration: 0.35,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseUp = useCallback(() => {
    gsap.to(disperseRef, {
      current: 0,
      duration: 1.4,
      ease: 'elastic.out(1, 0.45)',
    })
  }, [])

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return

    try {
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a100d)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    rendererRef.current = renderer
    container.appendChild(renderer.domElement)

    const pmrem = new PMREMGenerator(renderer)
    const envScene = new RoomEnvironment()
    scene.environment = pmrem.fromScene(envScene as THREE.Scene).texture
    pmrem.dispose()

    // Molten gold sphere with displacement
    const geometry = new THREE.SphereGeometry(1.2, 128, 128)
    const material = new THREE.MeshStandardMaterial({
      color: GOLD_COLOR,
      metalness: 1.0,
      roughness: 0.15,
      envMapIntensity: 1.2,
    })

    const uniforms = {
      uTime: { value: 0 },
      uMorphStrength: { value: 0.12 },
      uMouseDir: { value: new THREE.Vector3(0, 0, 0) },
      uDisperse: { value: 0 },
    }

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime
      shader.uniforms.uMorphStrength = uniforms.uMorphStrength
      shader.uniforms.uMouseDir = uniforms.uMouseDir
      shader.uniforms.uDisperse = uniforms.uDisperse

      shader.vertexShader = SNOISE_GLSL + '\n' + shader.vertexShader
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        vec3 transformed = vec3( position );
        float n1 = snoise(position * 1.2 + uTime * 0.15);
        float n2 = snoise(position * 2.5 + uTime * 0.25) * 0.5;
        float n3 = snoise(position * 0.6 - uTime * 0.08) * 0.3;
        float breathe = sin(uTime * 0.8) * 0.03;
        float displace = (n1 * 0.5 + n2 + n3 + breathe) * uMorphStrength * (1.0 - uDisperse);
        transformed += normal * displace;
        transformed += uMouseDir * 0.4 * (1.0 - uDisperse);
        `
      )
    }

    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.setScalar(0.9)
    scene.add(mesh)
    meshRef.current = mesh

    // Particles for dispersion effect
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const origins = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = 1.1
      origins[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      origins[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      origins[i * 3 + 2] = r * Math.cos(phi)
      positions[i * 3] = origins[i * 3]
      positions[i * 3 + 1] = origins[i * 3 + 1]
      positions[i * 3 + 2] = origins[i * 3 + 2]
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      colors[i * 3] = 0.77
      colors[i * 3 + 1] = 0.63
      colors[i * 3 + 2] = 0.35
    }
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    particles.visible = false
    scene.add(particles)
    particlesRef.current = particles
    particlePositionsRef.current = positions
    particleOriginsRef.current = origins

    // Lights
    const rectLight = new THREE.RectAreaLight(0xc5a059, 6, 4, 4)
    rectLight.position.set(2, 2, 3)
    rectLight.lookAt(0, 0, 0)
    scene.add(rectLight)

    const spotLight = new THREE.SpotLight(0xffeedd, 10, 15, Math.PI / 6, 0.5)
    spotLight.position.set(0, 0, 5)
    scene.add(spotLight)
    spotLightRef.current = spotLight

    scene.add(new THREE.AmbientLight(0x111100, 0.35))

    // Silk threads — store original positions to prevent cumulative drift
    silkLinesRef.current = []
    silkOriginalsRef.current = []
    const silkGroup = new THREE.Group()
    for (let i = 0; i < SILK_THREAD_COUNT; i++) {
      const points: THREE.Vector3[] = []
      for (let j = 0; j <= 10; j++) {
        const t = j / 10
        points.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 7,
            (Math.random() - 0.5) * 7,
            (t - 0.5) * 5 - 1
          )
        )
      }
      silkOriginalsRef.current.push(points.map(p => p.clone()))
      const curve = new THREE.CatmullRomCurve3(points)
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40))
      const lineMat = new THREE.LineBasicMaterial({
        color: EMERALD_COLOR,
        transparent: true,
        opacity: 0.3,
      })
      const line = new THREE.Line(lineGeo, lineMat)
      silkGroup.add(line)
      silkLinesRef.current.push({ curve, line })
    }
    scene.add(silkGroup)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const clock = new THREE.Clock()
    const meshMat = material
    const meshUniforms = uniforms

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      mouseRef.current.x = lerp(mouseRef.current.x, mouseRef.current.targetX, LERP_FACTOR)
      mouseRef.current.y = lerp(mouseRef.current.y, mouseRef.current.targetY, LERP_FACTOR)

      const mouseDir = new THREE.Vector3(mouseRef.current.x, mouseRef.current.y, 0).normalize()
      meshUniforms.uMouseDir.value.copy(mouseDir)
      meshUniforms.uTime.value = t
      meshUniforms.uDisperse.value = disperseRef.current

      if (spotLightRef.current) {
        spotLightRef.current.position.x = lerp(spotLightRef.current.position.x, mouseRef.current.x * 3, LERP_FACTOR)
        spotLightRef.current.position.y = lerp(spotLightRef.current.position.y, mouseRef.current.y * 3, LERP_FACTOR)
        spotLightRef.current.position.z = 5
        spotLightRef.current.target.position.set(0, 0, 0)
      }

      const d = disperseRef.current
      mesh.visible = d < 0.5
      particles.visible = d >= 0.02

      if (particles.visible && particlePositionsRef.current && particleOriginsRef.current) {
        const pos = particlePositionsRef.current
        const orig = particleOriginsRef.current
        const spread = 3.5 * d
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const ox = orig[i * 3]
          const oy = orig[i * 3 + 1]
          const oz = orig[i * 3 + 2]
          const tx = ox * (1 + spread)
          const ty = oy * (1 + spread)
          const tz = oz * (1 + spread)
          pos[i * 3] = lerp(pos[i * 3], tx, 0.15)
          pos[i * 3 + 1] = lerp(pos[i * 3 + 1], ty, 0.15)
          pos[i * 3 + 2] = lerp(pos[i * 3 + 2], tz, 0.15)
          if (d < 0.02) {
            pos[i * 3] = lerp(pos[i * 3], ox, 0.12)
            pos[i * 3 + 1] = lerp(pos[i * 3 + 1], oy, 0.12)
            pos[i * 3 + 2] = lerp(pos[i * 3 + 2], oz, 0.12)
          }
        }
        particleGeometry.attributes.position.needsUpdate = true
      }

      silkLinesRef.current.forEach(({ curve, line }, i) => {
        const pts = curve.points
        const origPts = silkOriginalsRef.current[i]
        if (!origPts) return
        const mx = mouseRef.current.x * 2.5
        const my = mouseRef.current.y * 2.5
        pts.forEach((p, j) => {
          const orig = origPts[j]
          const wave = Math.sin(t * 0.7 + i * 0.4 + j * 0.15) * 0.12
          // Reset to original position, then apply offsets (no accumulation)
          p.x = orig.x
          p.y = orig.y + wave * 0.03
          p.z = orig.z
          const dist = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2)
          if (dist < 2.2) {
            const f = (2.2 - dist) / 2.2
            p.x += (p.x - mx) * f * 0.04
            p.y += (p.y - my) * f * 0.04
          }
        })
        const geo = line.geometry as THREE.BufferGeometry
        const attr = geo.attributes.position
        const newPoints = curve.getPoints(40)
        for (let k = 0; k < newPoints.length; k++) {
          attr.setXYZ(k, newPoints[k].x, newPoints[k].y, newPoints[k].z)
        }
        attr.needsUpdate = true
      })

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      silkLinesRef.current.forEach(({ line }) => {
        line.geometry.dispose()
        ;(line.material as THREE.Material).dispose()
      })
    }
    } catch {
      onError?.()
      return () => {}
    }
  }, [containerRef, handleMouseMove, handleMouseDown, handleMouseUp, onError])

  return null
}
