// ── Edit these to customize the app ──────────────────────────────

// The hidden admin dashboard (tap the logo 5x on the landing screen) logs
// in with a Firebase user, not a value here — see the admin user you create
// in Firebase Console → Authentication → Users.

// How many ratings you're aiming to collect (shown as progress in admin).
export const TARGET_RESPONSES = 40

// Gender options shown on the screen right after Go. Collected so the
// admin dashboard can compare average rating/nervousness across groups.
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

// The 5-point emoji rating scale, worst to best.
export const EMOJI_SCALE = [
  { value: 1, emoji: '😟', label: 'Nervous' },
  { value: 2, emoji: '😐', label: 'Okay' },
  { value: 3, emoji: '🙂', label: 'Good' },
  { value: 4, emoji: '😄', label: 'Great' },
  { value: 5, emoji: '🤩', label: 'Amazing' },
]

export const PERSON_NAME = 'Maheswar'

// How many questions the stranger must mark as asked before Continue
// unlocks on the intro screen. Stops people rushing through without
// actually asking anything.
export const QUESTION_COUNT = 5
