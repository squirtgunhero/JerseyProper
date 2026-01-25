import type { PageExtraction } from '../extract/types'
import type { ModuleScore, ScoringResult, RuleResult, ModuleId } from '../rules/types'
import { computeGrade } from '../rules/utils'
import { evaluateModuleA } from '../rules/module-a'
import { evaluateModuleB } from '../rules/module-b'
import { evaluateModuleC } from '../rules/module-c'
import { evaluateModuleD } from '../rules/module-d'
import { evaluateModuleE } from '../rules/module-e'
import { evaluateModuleF } from '../rules/module-f'

interface ModuleConfig {
  id: ModuleId
  name: string
  maxPoints: number
  evaluate: (extraction: PageExtraction) => RuleResult[]
}

const MODULES: ModuleConfig[] = [
  { id: 'A', name: 'Answer-ability', maxPoints: 25, evaluate: evaluateModuleA },
  { id: 'B', name: 'Entity clarity', maxPoints: 20, evaluate: evaluateModuleB },
  { id: 'C', name: 'Trust & evidence', maxPoints: 20, evaluate: evaluateModuleC },
  { id: 'D', name: 'Structured data', maxPoints: 15, evaluate: evaluateModuleD },
  { id: 'E', name: 'Retrieval & accessibility', maxPoints: 10, evaluate: evaluateModuleE },
  { id: 'F', name: 'Citation likelihood', maxPoints: 10, evaluate: evaluateModuleF },
]

export function scoreExtraction(extraction: PageExtraction): ScoringResult {
  const modules: ModuleScore[] = []
  const allRules: RuleResult[] = []
  let overallScore = 0
  const maxScore = 100

  for (const moduleConfig of MODULES) {
    const rules = moduleConfig.evaluate(extraction)
    const earnedPoints = rules.reduce((sum, r) => sum + r.earnedPoints, 0)
    const percentage = moduleConfig.maxPoints > 0 
      ? (earnedPoints / moduleConfig.maxPoints) * 100 
      : 0

    modules.push({
      id: moduleConfig.id,
      name: moduleConfig.name,
      maxPoints: moduleConfig.maxPoints,
      earnedPoints,
      grade: computeGrade(percentage),
      rules,
    })

    allRules.push(...rules)
    overallScore += earnedPoints
  }

  return {
    overallScore,
    maxScore,
    modules,
    allRules,
  }
}

export function formatModuleScores(modules: ModuleScore[]): Record<string, { earned: number; max: number; grade: string }> {
  const result: Record<string, { earned: number; max: number; grade: string }> = {}
  for (const mod of modules) {
    result[mod.id] = {
      earned: mod.earnedPoints,
      max: mod.maxPoints,
      grade: mod.grade,
    }
  }
  return result
}
