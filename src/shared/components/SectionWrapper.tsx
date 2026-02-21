import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import type { IAnimationStrategy } from '@/core/interfaces/IAnimationStrategy'
import { slideUpStrategy } from '@/core/strategies/animations/SlideUpStrategy'
import { cn } from '@/shared/utils/cn'
import type { ReactNode } from 'react'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
  strategy?: IAnimationStrategy
}

export function SectionWrapper({
  id,
  children,
  className,
  strategy = slideUpStrategy,
}: SectionWrapperProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id={id} className={cn('py-20 px-4 sm:px-6 lg:px-8', className)}>
      <motion.div
        ref={ref}
        initial={strategy.initial}
        animate={inView ? strategy.animate : strategy.initial}
        transition={strategy.transition}
        className="mx-auto max-w-6xl"
      >
        {children}
      </motion.div>
    </section>
  )
}
