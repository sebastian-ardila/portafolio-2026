import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaLinkedin } from 'react-icons/fa'
import { SiGooglecalendar } from 'react-icons/si'
import { HiHeart } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '@/shared/components/SectionWrapper'
import { ContactForm } from '@/shared/components/ContactForm'
import { profile } from '@/config/profile'
import { SECTION_IDS } from '@/shared/utils/constants'
import { useAppDispatch } from '@/app/hooks'
import { openBooking } from '@/shared/slices/bookingSlice'

const journeyData = [
  { year: '2017', company: 'Onyx Soft' },
  { year: '2018', company: 'ExcelAscent' },
  { year: '2019', company: 'VeriTran' },
  { year: '2020', company: 'VeriTran' },
  { year: '2024', company: 'RunMyProcess' },
]

const journeyRoles = [
  'Software Developer',
  'Full Stack Developer',
  'Implementation Consultant',
  'Software Engineer II',
  'Sr. Software Engineer',
]

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { t } = useTranslation('about')
  const dispatch = useAppDispatch()

  const journey = [
    ...journeyData.map((item, i) => ({
      ...item,
      role: journeyRoles[i],
    })),
    { year: t('journey.now'), role: 'Director of UX', company: 'RunMyProcess' },
  ]

  return (
    <SectionWrapper id={SECTION_IDS.ABOUT}>
      {/* Photo + Bio + Quick links */}
      <div className="mx-auto mb-14 flex max-w-4xl flex-col items-center gap-8 md:flex-row md:items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0"
        >
          <img
            src="/sebastian-ardila.png"
            alt="Sebastian Ardila"
            className="h-32 w-32 rounded-full border-2 border-card-border object-cover grayscale transition-all duration-500 hover:border-cyan/40 hover:grayscale-0 sm:h-40 sm:w-40"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1"
        >
          <p className="mb-6 text-sm leading-relaxed text-foreground/60 sm:text-base">
            {t('bio')}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-gradient-to-r from-cyan/10 to-purple/10 px-4 py-2 text-sm font-medium text-cyan transition-all duration-300 hover:border-cyan/50 hover:shadow-[0_0_20px_rgba(0,245,255,0.15)]"
            >
              <FaLinkedin size={14} />
              {t('linkedin')}
            </a>
            <button
              onClick={() => dispatch(openBooking())}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-card-border bg-card px-4 py-2 text-sm font-medium text-foreground/50 transition-all duration-300 hover:border-cyan/30 hover:text-foreground/80"
            >
              <SiGooglecalendar size={12} />
              {t('knowUs')}
            </button>
            <Link
              to="/my-life"
              className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-2 text-sm font-medium text-foreground/50 transition-all duration-300 hover:border-cyan/30 hover:text-foreground/80"
            >
              <HiHeart size={14} />
              {t('myLife')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Journey + Contact form */}
      <div ref={ref} className="mx-auto flex max-w-4xl flex-col gap-10 md:flex-row md:gap-12">
        {/* Journey timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1"
        >
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/30">
            {t('journey.title')}
          </h4>
          <div className="relative">
            <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-cyan/30 via-purple/20 to-transparent sm:block" />
            <div className="space-y-1">
              {journey.map((item, i) => (
                <motion.div
                  key={item.year + item.company}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                  className="group flex flex-wrap items-center gap-x-3 gap-y-0.5 rounded-md px-2 py-1.5 transition-colors hover:bg-white/[0.03] sm:flex-nowrap sm:pl-5"
                >
                  <div className="hidden h-1.5 w-1.5 -translate-x-[23px] rounded-full border border-cyan/40 bg-background transition-colors group-hover:border-cyan group-hover:bg-cyan/30 sm:block" />
                  <span className="w-10 flex-shrink-0 font-mono text-xs font-semibold text-cyan/60">
                    {item.year}
                  </span>
                  <span className="min-w-0 text-sm text-foreground/70">{item.role}</span>
                  <span className="min-w-0 text-xs text-foreground/30">@ {item.company}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full md:w-96"
        >
          <ContactForm />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
