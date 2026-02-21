import { motion } from 'framer-motion'
import { cn } from '@/shared/utils/cn'
import type { ReactNode, MouseEvent } from 'react'
import { useRef, useState } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  tilt?: boolean
}

export function AnimatedCard({
  children,
  className,
  tilt = true,
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!tilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setRotateX((y - centerY) / -10)
    setRotateY((x - centerX) / 10)
  }

  function handleMouseLeave() {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={cn(
        'rounded-xl border border-card-border bg-card p-6 backdrop-blur-sm transition-colors',
        'hover:border-cyan/20 hover:bg-white/[0.07] hover:shadow-[0_0_20px_rgba(0,245,255,0.08)]',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
