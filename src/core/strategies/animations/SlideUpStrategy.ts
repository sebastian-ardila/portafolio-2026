import type { IAnimationStrategy } from '@/core/interfaces/IAnimationStrategy'

export const slideUpStrategy: IAnimationStrategy = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
}
