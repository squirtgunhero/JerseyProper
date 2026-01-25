export const metadata = {
  title: 'Studio | Jersey Proper',
  description: 'Content management for Jersey Proper blog',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="sanity-studio-wrapper" style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0,
      zIndex: 9999 
    }}>
      {children}
    </div>
  )
}
