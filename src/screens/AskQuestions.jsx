import { motion } from 'framer-motion'
import { useState } from 'react'
import AnimatedEmoji from '../components/AnimatedEmoji'
import { QUESTION_COUNT } from '../lib/config'

export default function AskQuestions({ onContinue }) {
  const [asked, setAsked] = useState(0)
  const isLastQuestion = asked === QUESTION_COUNT - 1

  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-center justify-center gap-10 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-sm">
        <h2 className="text-3xl font-extrabold md:text-4xl">
          Ask me question{' '}
          <motion.span
            key={asked}
            className="inline-block"
            initial={{ scale: 1.8, opacity: 0, y: -8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
          >
            {asked + 1}
          </motion.span>{' '}
          of {QUESTION_COUNT}
        </h2>
        <p className="mt-4 text-lg text-[var(--text-muted)] md:text-xl">
          Then tap below <AnimatedEmoji preset="bounceDown">👇</AnimatedEmoji>
        </p>
      </div>

      <div className="flex gap-3">
        {Array.from({ length: QUESTION_COUNT }).map((_, i) => (
          <motion.span
            key={`${i}-${i <= asked}`}
            className="h-3 w-3 rounded-full md:h-4 md:w-4"
            style={{ background: i <= asked ? 'var(--accent)' : 'var(--surface-strong)' }}
            initial={{ scale: i <= asked ? 0 : 1 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          />
        ))}
      </div>

      <motion.button
        onClick={() => (isLastQuestion ? onContinue() : setAsked((a) => a + 1))}
        whileTap={{ scale: 0.92 }}
        className="rounded-full px-12 py-5 text-xl font-bold md:text-2xl"
        style={{
          background: '#000000',
          color: '#ffffff',
          boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.45)',
        }}
      >
        {isLastQuestion ? 'Give me an honest rating →' : '✓ Question asked'}
      </motion.button>
    </motion.div>
  )
}
