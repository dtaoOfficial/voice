import { motion } from 'framer-motion'
import { useRef } from 'react'
import TypewriterText from '../components/TypewriterText'
import { PERSON_NAME } from '../lib/config'

export default function Landing({ onGo, onAdminTap }) {
  const taps = useRef([])

  function handleLogoTap() {
    const now = Date.now()
    taps.current = [...taps.current.filter((t) => now - t < 3000), now]
    if (taps.current.length >= 5) {
      taps.current = []
      onAdminTap()
    }
  }

  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={handleLogoTap}
        className="text-sm tracking-[0.3em] text-[var(--text)] uppercase"
        whileTap={{ scale: 0.9 }}
        aria-label="app logo"
      >
        ● Speak Game
      </motion.button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
        className="max-w-md sm:max-w-lg md:max-w-2xl"
      >
        <h1 className="text-5xl leading-tight font-extrabold sm:text-6xl md:text-7xl">
          <TypewriterText text="Got 60 seconds to help me?" startDelay={300} />
        </h1>
        <p className="mt-5 text-xl text-[var(--text-muted)] md:text-2xl">
          Tap Go to meet {PERSON_NAME} and try a quick game.
        </p>
      </motion.div>

      <motion.button
        onClick={onGo}
        className="relative flex h-44 w-44 items-center justify-center rounded-full text-4xl font-bold text-white shadow-2xl md:h-52 md:w-52 md:text-5xl"
        style={{
          background: '#000000',
          boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.5)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 200, damping: 14 }}
        whileTap={{ scale: 0.92 }}
      >
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: '#000000' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="relative">GO</span>
      </motion.button>
    </motion.div>
  )
}
