import { motion } from 'framer-motion'

const glowMap = {
  purple: 'hover:shadow-[0_0_40px_rgba(124,58,237,0.2)] hover:border-purple-500/25',
  cyan:   'hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] hover:border-cyan-500/25',
  blue:   'hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:border-blue-500/25',
}

export function GlowCard({
  children,
  className = '',
  glowColor = 'purple',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  glowColor?: 'purple' | 'cyan' | 'blue'
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.015 }}
      className={`relative rounded-2xl border border-white/[0.06] bg-white/[0.025]
        backdrop-blur-sm transition-all duration-500 ${glowMap[glowColor]} ${className}`}
    >
      <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-purple-400/40 to-transparent" />
      <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-purple-400/40 to-transparent" />
      {children}
    </motion.div>
  )
}
