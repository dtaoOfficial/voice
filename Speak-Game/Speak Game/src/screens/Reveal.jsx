import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import AnimatedEmoji from '../components/AnimatedEmoji'
import TypewriterText from '../components/TypewriterText'

export default function Reveal({ onDone }) {
  const [revealed, setRevealed] = useState(false)

  function reveal() {
    if (revealed) return
    setRevealed(true)
    setTimeout(onDone, 1600)
  }

  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-extrabold md:text-4xl">
        <TypewriterText text={revealed ? 'You won!' : 'Tap to reveal your gift!'} />
      </h2>

      <motion.button
        onClick={reveal}
        disabled={revealed}
        className="relative h-40 w-40 md:h-52 md:w-52"
        style={{ perspective: 800 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 18 }}
        whileTap={!revealed ? { scale: 1.06 } : {}}
      >
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: revealed ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-3xl text-5xl font-bold text-white md:text-6xl"
            style={{
              backfaceVisibility: 'hidden',
              background: '#000000',
              boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.45)',
            }}
            animate={!revealed ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ?
          </motion.div>
          <div
            className="glass absolute inset-0 flex items-center justify-center rounded-3xl"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <AnimatedEmoji preset="pulse" delay={0.7} className="text-7xl md:text-8xl">
              🍬
            </AnimatedEmoji>
          </div>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 28 }).map((_, i) => {
              const angle = (i / 28) * Math.PI * 2
              const dist = 160 + Math.random() * 140
              return (
                <motion.span
                  key={i}
                  className="absolute h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
                  style={{ background: '#000000' }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist + 80,
                    opacity: 0,
                    scale: 0.4,
                  }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                />
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
