import { motion } from 'framer-motion'

export function AchievementBadge() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-xs shadow-lg shadow-amber-500/30"
      title="Core Skill"
    >
      ★
    </motion.div>
  )
}
