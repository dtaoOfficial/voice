import { motion } from 'framer-motion'
import { useState } from 'react'
import TypewriterText from '../components/TypewriterText'
import { EMOJI_SCALE } from '../lib/config'

export default function Rating({ onRated }) {
  const [picked, setPicked] = useState(null)

  function pick(item) {
    setPicked(item.value)
    setTimeout(() => onRated(item.value), 550)
  }

  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-center justify-center gap-10 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-4xl font-extrabold md:text-5xl">
        <TypewriterText text="How did I do?" />
      </h2>

      <div className="grid grid-cols-5 gap-4 sm:gap-8 md:gap-10">
        {EMOJI_SCALE.map((item, i) => (
          <motion.button
            key={item.value}
            onClick={() => pick(item)}
            disabled={picked !== null}
            className="flex flex-col items-center gap-2 px-1 py-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: picked === null || picked === item.value ? 1 : 0.85,
              opacity: picked === null || picked === item.value ? 1 : 0.4,
            }}
            transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 260, damping: 16 }}
            whileTap={{ scale: 1.15 }}
          >
            <span className="text-5xl md:text-7xl">{item.emoji}</span>
            <span className="text-sm font-semibold text-[var(--text-muted)] md:text-base">
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>

      <p className="text-base text-[var(--text-muted)] md:text-lg">Tap the one that fits best</p>
    </motion.div>
  )
}
