import { motion } from 'framer-motion'

export default function HomeButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Go to home screen"
      className="glass fixed z-30 flex items-center justify-center rounded-full p-3 text-[var(--text)] md:p-4"
      style={{ top: 'calc(env(safe-area-inset-top, 0px) + 16px)', left: 16 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
      </svg>
    </motion.button>
  )
}
