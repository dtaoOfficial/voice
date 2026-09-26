import { motion } from 'framer-motion'

const presets = {
  float: {
    animate: { y: [0, -8, 0] },
    transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
  },
  pulse: {
    animate: { scale: [1, 1.15, 1] },
    transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
  },
  wiggle: {
    animate: { rotate: [0, -10, 10, -6, 6, 0] },
    transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
  },
  bounceDown: {
    animate: { y: [0, 6, 0] },
    transition: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' },
  },
}

export default function AnimatedEmoji({ children, preset = 'float', className = '', delay = 0 }) {
  const p = presets[preset]
  return (
    <motion.span
      className={`inline-block ${className}`}
      animate={p.animate}
      transition={{ ...p.transition, delay }}
    >
      {children}
    </motion.span>
  )
}
