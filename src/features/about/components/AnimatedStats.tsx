import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'

interface StatItemProps {
  label: string
  value: number
  suffix?: string
}

function StatItem({ label, value, suffix = '' }: StatItemProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <div ref={ref} className="flex items-baseline gap-2">
      <span className="font-mono text-2xl font-bold text-cyan">
        {count}
        {suffix}
      </span>
      <span className="text-sm text-foreground/40">{label}</span>
    </div>
  )
}

export function AnimatedStats() {
  const { t } = useTranslation('about')

  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 sm:gap-x-8">
      <StatItem label={t('stats.yearsExperience')} value={9} suffix="+" />
      <StatItem label={t('stats.technologies')} value={20} suffix="+" />
      <StatItem label={t('stats.cupsOfCoffee')} value={5000} suffix="+" />
    </div>
  )
}
