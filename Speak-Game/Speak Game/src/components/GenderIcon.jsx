import { motion } from 'framer-motion'

const SHAPES = {
  male: {
    circle: { cx: 38, cy: 62, r: 24 },
    lines: ['M55 45 L86 14', 'M86 32 L86 14 L68 14'],
  },
  female: {
    circle: { cx: 50, cy: 38, r: 24 },
    lines: ['M50 62 L50 92', 'M36 78 L64 78'],
  },
}

export default function GenderIcon({ type, size = 64 }) {
  const shape = SHAPES[type]
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <motion.circle
        cx={shape.circle.cx}
        cy={shape.circle.cy}
        r={shape.circle.r}
        stroke="currentColor"
        strokeWidth="7"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      {shape.lines.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.15, ease: 'easeOut' }}
        />
      ))}
    </svg>
  )
}
