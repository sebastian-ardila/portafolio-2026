import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

export function useXPAnimation(targetXP: number, maxXP: number) {
  const [currentXP, setCurrentXP] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 1500
    const steps = 60
    const increment = targetXP / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetXP) {
        setCurrentXP(targetXP)
        clearInterval(timer)
      } else {
        setCurrentXP(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, targetXP])

  return { ref, currentXP, percentage: (currentXP / maxXP) * 100 }
}
