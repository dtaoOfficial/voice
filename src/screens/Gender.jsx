import { motion } from 'framer-motion'
import GenderIcon from '../components/GenderIcon'
import { GENDER_OPTIONS } from '../lib/config'

export default function Gender({ onPicked }) {
  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-center justify-center gap-10 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-md">
        <h2 className="text-4xl leading-tight font-extrabold md:text-5xl">Quick one first</h2>
        <p className="mt-3 text-lg text-[var(--text-muted)] md:text-xl">Are you...</p>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {GENDER_OPTIONS.map((option, i) => (
          <motion.button
            key={option.value}
            onClick={() => onPicked(option.value)}
            className="glass flex w-36 flex-col items-center gap-2 rounded-3xl px-6 py-8 md:w-44"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 240, damping: 18 }}
            whileTap={{ scale: 0.94 }}
          >
            <GenderIcon type={option.value} size={56} />
            <span className="text-lg font-bold md:text-xl">{option.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
