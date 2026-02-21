import type { IAnimationStrategy } from '@/core/interfaces/IAnimationStrategy'

export const fadeInStrategy: IAnimationStrategy = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' },
}
