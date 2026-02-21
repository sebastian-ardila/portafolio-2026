import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'
import type { IExperience } from '@/app/types'

interface TimelineItemProps {
  item: IExperience
  index: number
}

export function TimelineItem({ item, index }: TimelineItemProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const isLeft = index % 2 === 0
  const { t } = useTranslation('experience')

  const translatedRole = t(`roles.${item.id}.role`, { defaultValue: item.role })
  const translatedDescription = t(`roles.${item.id}.description`, { defaultValue: item.description })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`relative flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} md:w-1/2 ${isLeft ? 'md:pr-10 md:self-start' : 'md:pl-10 md:self-end'}`}
    >
      {/* Pulsing dot */}
      <div
        className={`absolute top-6 hidden h-4 w-4 rounded-full border-2 border-cyan bg-background md:block ${
          isLeft ? '-right-2' : '-left-2'
        }`}
      >
        {item.current && (
          <span className="absolute inset-0 animate-ping rounded-full bg-cyan/40" />
        )}
      </div>

      <div
        className={`relative overflow-hidden rounded-xl border p-6 backdrop-blur-sm transition-colors ${
          item.current
            ? 'border-cyan/30 bg-card shadow-[0_0_25px_rgba(0,245,255,0.08)]'
            : 'border-card-border bg-card hover:border-cyan/20'
        }`}
      >
        {item.current && (
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
        )}

        <div className="mb-1 flex items-center gap-2">
          <span className="font-mono text-xs text-cyan">{item.period}</span>
          {item.current && (
            <span className="animate-pulse rounded-full bg-cyan/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan shadow-[0_0_10px_rgba(0,245,255,0.15)]">
              {t('current')}
            </span>
          )}
        </div>
        <h4 className={`text-lg font-bold ${item.current ? 'text-cyan' : ''}`}>
          {translatedRole}
        </h4>
        <p className={`mb-3 text-sm ${item.current ? 'text-foreground/60' : 'text-foreground/50'}`}>
          {item.company}
        </p>
        <p className={`mb-4 text-sm leading-relaxed ${item.current ? 'text-foreground/70' : 'text-foreground/60'}`}>
          {translatedDescription}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className={`rounded-full px-2.5 py-0.5 text-xs ${
                item.current
                  ? 'bg-cyan/10 text-cyan/70'
                  : 'bg-white/5 text-foreground/50'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
