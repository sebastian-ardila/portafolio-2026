import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  HiLocationMarker,
  HiAcademicCap,
  HiBriefcase,
  HiCode,
} from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '@/shared/components/SectionWrapper'
import { AnimatedStats } from './AnimatedStats'
import { profile } from '@/config/profile'
import { SECTION_IDS } from '@/shared/utils/constants'

const journeyData = [
  { year: '2017', company: 'Onyx Soft' },
  { year: '2018', company: 'ExcelAscent' },
  { year: '2019', company: 'VeriTran' },
  { year: '2020', company: 'VeriTran' },
  { year: '2024', company: 'RunMyProcess' },
]

const iconMap = [HiBriefcase, HiAcademicCap, HiLocationMarker, HiCode]

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { t } = useTranslation('about')

  const infoCards = [
    {
      icon: iconMap[0],
      label: t('infoCards.currentRole'),
      value: t('infoCards.currentRoleValue'),
      sub: t('infoCards.currentRoleSub'),
    },
    {
      icon: iconMap[1],
      label: t('infoCards.education'),
      value: t('infoCards.educationValue'),
      sub: t('infoCards.educationSub'),
    },
    {
      icon: iconMap[2],
      label: t('infoCards.basedIn'),
      value: profile.location,
      sub: t('infoCards.basedInSub'),
    },
    {
      icon: iconMap[3],
      label: t('infoCards.specialization'),
      value: t('infoCards.specializationValue'),
      sub: t('infoCards.specializationSub'),
    },
  ]

  const journeyRoles = [
    'Software Developer',
    'Full Stack Developer',
    'Implementation Consultant',
    'Software Engineer II',
    'Sr. Software Engineer',
  ]

  const journey = [
    ...journeyData.map((item, i) => ({
      ...item,
      role: journeyRoles[i],
    })),
    { year: t('journey.now'), role: 'Director of UX', company: 'RunMyProcess' },
  ]

  return (
    <SectionWrapper id={SECTION_IDS.ABOUT}>
      <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-cyan">
        {t('sectionLabel')}
      </h2>
      <h3 className="mb-10 text-center text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h3>

      <div ref={ref} className="space-y-10">
        {/* Bio + Stats */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 text-lg leading-relaxed text-foreground/70"
          >
            {t('bio')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center"
          >
            <AnimatedStats />
          </motion.div>
        </div>

        {/* Info cards */}
        <div className="mx-auto grid max-w-2xl gap-2 sm:grid-cols-2">
          {infoCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="group flex items-start gap-3 rounded-lg border border-card-border bg-card px-3 py-2.5 transition-all hover:border-cyan/20 hover:bg-white/[0.07]"
            >
              <span className="mt-0.5 inline-flex rounded-md bg-cyan/10 p-1.5 text-cyan transition-colors group-hover:bg-cyan/20">
                <card.icon size={12} />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/40">
                  {card.label}
                </p>
                <p className="text-xs font-semibold text-foreground/90">
                  {card.value}
                </p>
                <p className="text-[11px] text-foreground/50">{card.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Journey timeline — compact horizontal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h4 className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-foreground/30">
            {t('journey.title')}
          </h4>
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              {/* Line */}
              <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-cyan/30 via-purple/20 to-transparent sm:block" />
              <div className="space-y-1">
                {journey.map((item, i) => (
                  <motion.div
                    key={item.year + item.company}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 + i * 0.06 }}
                    className="group flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-white/[0.03] sm:pl-5"
                  >
                    <div className="hidden h-1.5 w-1.5 -translate-x-[23px] rounded-full border border-cyan/40 bg-background transition-colors group-hover:border-cyan group-hover:bg-cyan/30 sm:block" />
                    <span className="w-10 flex-shrink-0 font-mono text-xs font-semibold text-cyan/60">
                      {item.year}
                    </span>
                    <span className="text-sm text-foreground/70">{item.role}</span>
                    <span className="text-xs text-foreground/30">@ {item.company}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
