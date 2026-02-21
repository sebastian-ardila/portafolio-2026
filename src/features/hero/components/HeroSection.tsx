import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaTerminal } from 'react-icons/fa'
import { HiArrowDown, HiDownload } from 'react-icons/hi'
import { SiGooglecalendar } from 'react-icons/si'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ParticleBackground } from './ParticleBackground'
import { TypingIntro } from './TypingIntro'
import { profile } from '@/config/profile'
import { SECTION_IDS } from '@/shared/utils/constants'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { openTerminal } from '@/features/terminal/slices/terminalSlice'
import { openBooking } from '@/shared/slices/bookingSlice'
import { fetchPosts, selectFilteredPosts } from '@/features/blog/slices/blogSlice'

export function HeroSection() {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectFilteredPosts)
  const { t, i18n } = useTranslation('hero')
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'

  useEffect(() => {
    dispatch(fetchPosts(lang))
  }, [dispatch, lang])

  const latestPosts = posts.slice(0, 6)

  return (
    <section
      id={SECTION_IDS.HERO}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <ParticleBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
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
          {profile.name.split(' ').map((word, i) => (
            <span key={word}>
              {i === 0 ? (
                <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                ` ${word}`
              )}
            </span>
          ))}
        </motion.h1>

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
          className="mb-10 flex items-center justify-center gap-6 font-mono text-sm text-foreground/40"
        >
          <span>{t('years', { count: profile.stats.yearsExperience })}</span>
          <span className="text-cyan/30">&middot;</span>
          <span>{t('technologies', { count: profile.stats.technologiesMastered })}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
        >
          <button
            onClick={() => dispatch(openBooking())}
            className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-cyan/30 bg-gradient-to-r from-cyan/10 to-purple/10 px-7 py-3 font-medium text-cyan shadow-[0_0_20px_rgba(0,245,255,0.08)] transition-all duration-300 hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] sm:w-auto"
          >
            <SiGooglecalendar size={16} />
            {t('bookMeeting')}
          </button>
          <a
            href={lang === 'es' ? profile.resumeUrlEs : profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-card-border bg-card px-7 py-3 font-medium text-foreground/50 transition-all duration-300 hover:border-cyan/30 hover:text-foreground/80 hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] sm:w-auto"
          >
            <HiDownload size={18} className="transition-colors group-hover:text-cyan" />
            {t('downloadResume')}
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-card-border bg-card px-7 py-3 font-medium text-foreground/50 transition-all duration-300 hover:border-cyan/30 hover:text-foreground/80 hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] sm:w-auto"
          >
            <FaGithub size={18} className="transition-colors group-hover:text-cyan" />
            {t('github')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-8"
        >
          <button
            onClick={() => dispatch(openTerminal())}
            aria-label="Open interactive terminal"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-cyan/10 bg-[#0d0d14]/80 px-4 py-2 font-mono text-xs text-foreground/40 transition-all hover:border-cyan/30 hover:text-cyan hover:shadow-[0_0_20px_rgba(0,245,255,0.1)]"
          >
            <FaTerminal className="text-cyan/50 transition-colors group-hover:text-cyan" />
            <span className="text-cyan/50 transition-colors group-hover:text-cyan">$</span>
            {' '}{t('openTerminal')}
            <span className="ml-1 animate-pulse text-cyan">_</span>
          </button>
        </motion.div>

        {latestPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-cyan/40">
              {t('latestPosts')}
            </span>
            <div className="mx-auto w-full max-w-xl space-y-1">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group/post flex items-center justify-between rounded-md px-3 py-1.5 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="truncate text-xs text-foreground/40 transition-colors group-hover/post:text-cyan">
                    {post.title}
                  </span>
                  <span className="ml-4 flex-shrink-0 font-mono text-[10px] text-foreground/20">
                    {post.date}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              to="/blog"
              className="mt-1 font-mono text-xs text-cyan/40 transition-colors hover:text-cyan"
            >
              {t('viewAllPosts')} &rarr;
            </Link>
          </motion.div>
        )}
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
