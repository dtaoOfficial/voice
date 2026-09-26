import { motion } from 'framer-motion'
import AnimatedEmoji from '../components/AnimatedEmoji'
import CheckIcon from '../components/CheckIcon'
import TypewriterText from '../components/TypewriterText'
import { PERSON_NAME } from '../lib/config'

export default function ThankYou({ onDone }) {
  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      >
        <CheckIcon size={88} />
      </motion.div>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="max-w-md"
      >
        <h2 className="text-4xl font-extrabold md:text-5xl">
          <TypewriterText text="Thank you so much!" startDelay={300} />
        </h2>
        <p className="mt-4 text-xl text-[var(--text-muted)] md:text-2xl">
          That really means a lot to me. Your sweet <AnimatedEmoji preset="pulse">🍬</AnimatedEmoji>{' '}
          is with {PERSON_NAME} — grab it whenever you're ready.
        </p>
      </motion.div>

      <motion.button
        onClick={onDone}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-full px-12 py-5 text-xl font-bold text-white md:text-2xl"
        style={{
          background: '#000000',
          boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.45)',
        }}
      >
        Done
      </motion.button>
    </motion.div>
  )
}
