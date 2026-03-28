import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { HiBriefcase, HiLightningBolt } from 'react-icons/hi'
import { experience } from '@/config/experience'
import { cn } from '@/shared/utils/cn'
import type { IParallelProject } from '@/app/types'

// Collect all parallel projects
const allParallel = experience.flatMap((e) => e.parallel ?? [])

function ParallelCard({ p }: { p: IParallelProject }) {
  const content = (
    <>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <span className="font-mono text-xs font-semibold text-purple/60">{p.period}</span>
      </div>
      <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
        <span className="text-sm font-semibold text-foreground/70">{p.role}</span>
        <span className="text-xs text-foreground/30">@ {p.name}</span>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-foreground/45">{p.description}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {p.technologies.map((tech) => (
          <span key={tech} className="rounded-full bg-purple/5 px-2 py-0.5 text-[10px] text-purple/60">
            {tech}
          </span>
        ))}
      </div>
    </>
  )

  if (p.url) {
    return (
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
      >
        {content}
      </a>
    )
  }

  return <div className="rounded-lg px-3 py-2.5">{content}</div>
}

type MobileTab = 'work' | 'entrepreneurship'

export function Timeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { t } = useTranslation('experience')
  const [mobileTab, setMobileTab] = useState<MobileTab>('work')

  return (
    <div ref={ref} className="mx-auto max-w-4xl">
      {/* Mobile tab toggle */}
      <div className="mb-6 flex gap-3 sm:hidden">
        <button
          onClick={() => setMobileTab('work')}
          className={cn(
            'flex flex-1 flex-col items-center gap-1 border-b-2 pb-3 pt-1 transition-all',
            mobileTab === 'work'
              ? 'border-cyan text-cyan'
              : 'border-transparent text-foreground/30'
          )}
        >
          <HiBriefcase size={16} />
          <span className="text-xs font-semibold uppercase tracking-wider">Work Experience</span>
        </button>
        <button
          onClick={() => setMobileTab('entrepreneurship')}
          className={cn(
            'flex flex-1 flex-col items-center gap-1 border-b-2 pb-3 pt-1 transition-all',
            mobileTab === 'entrepreneurship'
              ? 'border-purple text-purple'
              : 'border-transparent text-foreground/30'
          )}
        >
          <HiLightningBolt size={16} />
          <span className="text-xs font-semibold uppercase tracking-wider">Entrepreneurship</span>
        </button>
      </div>

      {/* Mobile: Work Experience */}
      {mobileTab === 'work' && (
        <div className="relative sm:hidden">
          <div className="absolute left-[7px] top-0 h-full w-px bg-gradient-to-b from-cyan/30 via-cyan/10 to-transparent" />
          <div className="space-y-1">
            {experience.map((item, i) => {
              const role = t(`roles.${item.id}.role`, { defaultValue: item.role })
              const description = t(`roles.${item.id}.description`, { defaultValue: item.description })
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex gap-4"
                >
                  <div className="relative flex flex-col items-center pt-3">
                    <div className={`relative z-10 h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 ${
                      item.current ? 'border-cyan bg-cyan/30' : 'border-foreground/20 bg-background'
                    }`} />
                  </div>
                  {(() => {
                    const mCardClass = `flex-1 rounded-lg px-2 py-2.5 transition-colors hover:bg-white/[0.04] ${item.current ? 'bg-white/[0.02]' : ''}`
                    const mCardContent = (
                      <>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                          <span className="font-mono text-xs font-semibold text-cyan/60">{item.period}</span>
                          {item.current && (
                            <span className="rounded-full bg-cyan/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan">
                              {t('current')}
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                          <span className={`text-sm font-semibold ${item.current ? 'text-foreground/90' : 'text-foreground/70'}`}>
                            {role}
                          </span>
                          <span className="text-xs text-foreground/30">@ {item.company}</span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-foreground/45">{description}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.technologies.slice(0, 6).map((tech) => (
                            <span key={tech} className={`rounded-full px-2 py-0.5 text-[10px] ${
                              item.current ? 'bg-cyan/5 text-cyan/60' : 'bg-white/[0.03] text-foreground/35'
                            }`}>{tech}</span>
                          ))}
                          {item.technologies.length > 6 && (
                            <span className="text-[10px] text-foreground/25">+{item.technologies.length - 6}</span>
                          )}
                        </div>
                      </>
                    )
                    return item.companyUrl ? (
                      <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className={mCardClass}>{mCardContent}</a>
                    ) : (
                      <div className={mCardClass}>{mCardContent}</div>
                    )
                  })()}
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Mobile: Entrepreneurship */}
      {mobileTab === 'entrepreneurship' && (
        <div className="relative sm:hidden">
          <div className="absolute left-[7px] top-0 h-full w-px bg-gradient-to-b from-purple/30 via-purple/10 to-transparent" />
          <div className="space-y-1">
            {allParallel.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex gap-4"
              >
                <div className="relative flex flex-col items-center pt-3">
                  <div className="relative z-10 h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 border-purple/40 bg-purple/20" />
                </div>
                <div className="flex-1 rounded-lg bg-white/[0.02] px-2 py-2.5">
                  <span className="font-mono text-xs font-semibold text-purple/60">{p.period}</span>
                  <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer"
                        className="text-sm font-semibold text-foreground/70 transition-colors hover:text-purple">
                        {p.role}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-foreground/70">{p.role}</span>
                    )}
                    <span className="text-xs text-foreground/30">@ {p.name}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/45">{p.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.technologies.map((tech) => (
                      <span key={tech} className="rounded-full bg-purple/5 px-2 py-0.5 text-[10px] text-purple/60">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Desktop layout */}
      <div className="relative hidden sm:block">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan/30 via-cyan/10 to-transparent" />

        {/* Column titles */}
        <div className="mb-6 grid grid-cols-[1fr_20px_1fr] gap-0">
          <div className="flex items-center justify-end gap-2 pr-4">
            <HiLightningBolt size={14} className="text-purple/60" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple/50">Entrepreneurship</span>
          </div>
          <div />
          <div className="flex items-center gap-2 pl-7">
            <HiBriefcase size={14} className="text-cyan/60" />
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan/50">Work Experience</span>
          </div>
        </div>

        <div className="space-y-1">
          {experience.map((item, i) => {
            const role = t(`roles.${item.id}.role`, { defaultValue: item.role })
            const description = t(`roles.${item.id}.description`, { defaultValue: item.description })
            const hasParallel = item.parallel && item.parallel.length > 0

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="relative"
              >
                <div className="grid grid-cols-[1fr_20px_1fr] gap-0">
                  {/* Left column */}
                  <div className="flex items-start justify-end pr-4">
                    {hasParallel && (
                      <div className="w-full space-y-1.5">
                        {item.parallel!.map((p) => (
                          <ParallelCard key={p.name} p={p} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="relative flex justify-center pt-3">
                    <div className={`relative z-10 h-3 w-3 rounded-full border-2 ${
                      item.current ? 'border-cyan bg-cyan/30' : 'border-foreground/20 bg-background'
                    }`}>
                      {item.current && (
                        <span className="absolute -inset-0.5 animate-ping rounded-full bg-cyan/20" />
                      )}
                    </div>
                  </div>

                  {/* Right column */}
                  {(() => {
                    const cardClass = `block rounded-lg px-3 py-2.5 pl-4 transition-colors hover:bg-white/[0.04] ${
                      item.current ? 'min-h-[480px] bg-white/[0.02]' : ''
                    }`
                    const cardContent = (
                      <>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                          <span className="font-mono text-xs font-semibold text-cyan/60">{item.period}</span>
                          {item.current && (
                            <span className="rounded-full bg-cyan/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan">
                              {t('current')}
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                          <span className={`text-sm font-semibold ${item.current ? 'text-foreground/90' : 'text-foreground/70'}`}>
                            {role}
                          </span>
                          <span className="text-xs text-foreground/30">@ {item.company}</span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-foreground/45">{description}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.technologies.slice(0, 6).map((tech) => (
                            <span key={tech} className={`rounded-full px-2 py-0.5 text-[10px] ${
                              item.current ? 'bg-cyan/5 text-cyan/60' : 'bg-white/[0.03] text-foreground/35'
                            }`}>{tech}</span>
                          ))}
                          {item.technologies.length > 6 && (
                            <span className="text-[10px] text-foreground/25">+{item.technologies.length - 6}</span>
                          )}
                        </div>
                      </>
                    )
                    return item.companyUrl ? (
                      <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>{cardContent}</a>
                    ) : (
                      <div className={cardClass}>{cardContent}</div>
                    )
                  })()}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
