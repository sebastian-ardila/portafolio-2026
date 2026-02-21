import type { IAnimationStrategy } from '@/core/interfaces/IAnimationStrategy'

export const scaleStrategy: IAnimationStrategy = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
}
