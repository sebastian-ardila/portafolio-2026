import type { TargetAndTransition, VariantLabels } from 'framer-motion'

export interface IAnimationStrategy {
  initial: TargetAndTransition | VariantLabels | boolean
  animate: TargetAndTransition | VariantLabels
  transition?: object
}
