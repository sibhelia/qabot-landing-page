export function GradientText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}
