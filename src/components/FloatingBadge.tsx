import { motion } from 'framer-motion'

export function FloatingBadge({
  children,
  className = '',
  delay = 0,
  floatY = -10,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  floatY?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, floatY, 0],
        transition: {
          opacity: { duration: 0.6, delay },
          y: { duration: 4, delay, repeat: Infinity, ease: 'easeInOut' },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
