import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import HomeButton from './components/HomeButton'
import Admin from './screens/Admin'
import AskQuestions from './screens/AskQuestions'
import Gender from './screens/Gender'
import Intro from './screens/Intro'
import Landing from './screens/Landing'
import Rating from './screens/Rating'
import Reveal from './screens/Reveal'
import ThankYou from './screens/ThankYou'
import { flushPending, saveResponse } from './lib/storage'

const HOME_BUTTON_SCREENS = ['gender', 'intro', 'questions', 'rating', 'reveal', 'thankyou']

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [gender, setGender] = useState(null)
  const [rating, setRating] = useState(null)

  useEffect(() => {
    flushPending()
    window.addEventListener('online', flushPending)
    return () => window.removeEventListener('online', flushPending)
  }, [])

  function reset() {
    setGender(null)
    setRating(null)
    setScreen('landing')
  }

  return (
    <div className="relative h-dvh w-dvw overflow-hidden" style={{ background: 'var(--bg)' }}>
      <AnimatePresence>{HOME_BUTTON_SCREENS.includes(screen) && <HomeButton key="home" onClick={reset} />}</AnimatePresence>
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <Landing key="landing" onGo={() => setScreen('gender')} onAdminTap={() => setScreen('admin')} />
        )}
        {screen === 'gender' && (
          <Gender
            key="gender"
            onPicked={(value) => {
              setGender(value)
              setScreen('intro')
            }}
          />
        )}
        {screen === 'intro' && <Intro key="intro" onContinue={() => setScreen('questions')} />}
        {screen === 'questions' && (
          <AskQuestions key="questions" onContinue={() => setScreen('rating')} />
        )}
        {screen === 'rating' && (
          <Rating
            key="rating"
            onRated={(value) => {
              setRating(value)
              setScreen('reveal')
            }}
          />
        )}
        {screen === 'reveal' && (
          <Reveal
            key="reveal"
            onDone={() => {
              saveResponse({ rating, gender, prize: 'sweet' }).catch(console.error)
              setScreen('thankyou')
            }}
          />
        )}
        {screen === 'thankyou' && <ThankYou key="thankyou" onDone={reset} />}
        {screen === 'admin' && <Admin key="admin" onBack={reset} />}
      </AnimatePresence>
    </div>
  )
}
