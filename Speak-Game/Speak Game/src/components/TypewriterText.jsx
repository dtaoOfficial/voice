import { useEffect, useState } from 'react'

export default function TypewriterText({ text, speed = 35, startDelay = 0, onDone, className = '' }) {
  const [count, setCount] = useState(0)
  const done = count >= text.length

  useEffect(() => {
    setCount(0)
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          const next = c + 1
          if (next >= text.length) clearInterval(interval)
          return next
        })
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  useEffect(() => {
    if (done) onDone?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done])

  return (
    <span className={className}>
      {text.slice(0, count)}
      {!done && <span className="animate-pulse">|</span>}
    </span>
  )
}
