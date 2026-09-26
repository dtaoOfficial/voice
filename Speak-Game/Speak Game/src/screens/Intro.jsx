import { motion } from 'framer-motion'
import { useState } from 'react'
import TypewriterText from '../components/TypewriterText'
import { PERSON_NAME } from '../lib/config'

const lines = [
  `Hi, my name is ${PERSON_NAME}.`,
  "I get very nervous when I talk to people I don't know.",
  'Please ask me a few questions and rate me honestly.',
  "You'll get a small gift too!",
]

export default function Intro({ onContinue }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [showContinue, setShowContinue] = useState(false)

  function nextLine() {
    if (lineIndex < lines.length - 1) {
      setLineIndex((i) => i + 1)
    } else {
      setShowContinue(true)
    }
  }

  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-center justify-center gap-10 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-xl">
        {lines.slice(0, lineIndex + 1).map((line, i) => (
          <p
            key={i}
            className={
              i === 0
                ? 'text-4xl font-extrabold md:text-5xl'
                : 'mt-5 text-xl text-[var(--text-muted)] md:text-2xl'
            }
          >
            {i === lineIndex ? <TypewriterText text={line} onDone={nextLine} /> : line}
          </p>
        ))}
      </div>

      {showContinue && (
        <motion.button
          onClick={onContinue}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileTap={{ scale: 0.92 }}
          className="rounded-full px-12 py-5 text-xl font-bold text-white md:text-2xl"
          style={{
            background: '#000000',
            boxShadow: '0 12px 32px -8px rgba(0, 0, 0, 0.45)',
          }}
        >
          Continue →
        </motion.button>
      )}
    </motion.div>
  )
}
