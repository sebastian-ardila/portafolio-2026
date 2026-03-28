import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { HiArrowDown, HiDownload } from 'react-icons/hi'
import { SiGooglecalendar } from 'react-icons/si'
import { useTranslation } from 'react-i18next'
import { ParticleBackground } from './ParticleBackground'
import { TypingIntro } from './TypingIntro'
import { profile } from '@/config/profile'
import { SECTION_IDS } from '@/shared/utils/constants'
import { useAppDispatch } from '@/app/hooks'
import { openBooking } from '@/shared/slices/bookingSlice'

export function HeroSection() {
  const dispatch = useAppDispatch()
  const { t, i18n } = useTranslation('hero')
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'

  const yearsOfExperience = useMemo(() => {
    return new Date().getFullYear() - 2017
  }, [])

  return (
    <section
      id={SECTION_IDS.HERO}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <ParticleBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 font-mono text-sm text-cyan/80"
        >
          {t('greeting')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4 text-4xl font-bold sm:text-5xl md:text-7xl"
        >
          {profile.name.split(' ').map((word, i) => {
            if (i === 0) {
              return (
                <span key={word}>
                  <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
                    {word}
                  </span>
                </span>
              )
            }
            // "Agudelo" hidden for SEO
            if (word === 'Agudelo') {
              return <span key={word} className="sr-only"> {word}</span>
            }
            return <span key={word}> {word}</span>
          })}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 font-mono text-xs text-foreground/40 sm:text-sm"
        >
          +{yearsOfExperience} {t('yearsBadge')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8 h-10"
        >
          <h2 className="sr-only">{profile.role}</h2>
          <TypingIntro />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-10 flex items-center justify-center gap-2 font-mono text-xs text-foreground/40 sm:text-sm"
        >
          <span>{t('currentlyAt')}</span>
          <a
            href="https://clinity.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-foreground/60 transition-colors hover:text-cyan"
          >
            <img src="/clinity-icon.svg" alt="Clinity" className="h-4 w-4" />
            Clinity
          </a>
          <span className="text-cyan/30">&</span>
          <a
            href="https://www.runmyprocess.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-foreground/60 transition-colors hover:text-cyan"
          >
            <img src="/rmp-icon.png" alt="RunMyProcess" className="h-4 w-4" />
            RMP
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
        >
          <button
            onClick={() => dispatch(openBooking())}
            className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-cyan/30 bg-gradient-to-r from-cyan/10 to-purple/10 px-5 py-2.5 text-sm font-medium text-cyan shadow-[0_0_20px_rgba(0,245,255,0.08)] transition-all duration-300 hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] sm:w-auto sm:px-7 sm:py-3 sm:text-base"
          >
            <SiGooglecalendar size={16} />
            {t('bookMeeting')}
          </button>
          <a
            href={lang === 'es' ? profile.resumeUrlEs : profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-card-border bg-card px-5 py-2.5 text-sm font-medium text-foreground/50 transition-all duration-300 hover:border-cyan/30 hover:text-foreground/80 hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] sm:w-auto sm:px-7 sm:py-3 sm:text-base"
          >
            <HiDownload size={18} className="transition-colors group-hover:text-cyan" />
            {t('downloadResume')}
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-card-border bg-card px-5 py-2.5 text-sm font-medium text-foreground/50 transition-all duration-300 hover:border-cyan/30 hover:text-foreground/80 hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] sm:w-auto sm:px-7 sm:py-3 sm:text-base"
          >
            <FaGithub size={18} className="transition-colors group-hover:text-cyan" />
            {t('github')}
          </a>
        </motion.div>
      </div>

      <motion.a
        href={`#${SECTION_IDS.ABOUT}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <HiArrowDown className="text-2xl text-cyan/60" />
        </motion.div>
      </motion.a>

    </section>
  )
}
