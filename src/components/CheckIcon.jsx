import { motion } from 'framer-motion'

export default function CheckIcon({ size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <motion.circle
        cx="50"
        cy="50"
        r="44"
        stroke="#000000"
        strokeWidth="6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.path
        d="M30 52 L44 66 L72 36"
        stroke="#000000"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
      />
    </svg>
  )
}
