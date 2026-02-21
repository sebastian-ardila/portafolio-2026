import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiGooglecalendar } from 'react-icons/si'
import { useTranslation } from 'react-i18next'
import { profile } from '@/config/profile'
import { useAppDispatch } from '@/app/hooks'
import { openBooking } from '@/shared/slices/bookingSlice'

export function SocialLinks() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation('contact')

  const externalLinks = [
    { icon: FaGithub, href: profile.social.github, label: t('github') },
    { icon: FaLinkedin, href: profile.social.linkedin, label: t('linkedin') },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {/* Calendar — primary card */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => dispatch(openBooking())}
        className="group flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-cyan/30 bg-gradient-to-br from-cyan/10 to-purple/10 p-6 shadow-[0_0_20px_rgba(0,245,255,0.08)] transition-all hover:border-cyan/50 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)]"
      >
        <SiGooglecalendar className="text-3xl text-cyan transition-colors group-hover:text-cyan" />
        <span className="text-sm text-cyan/70 transition-colors group-hover:text-cyan">
          {t('calendar')}
        </span>
      </motion.button>

      {/* External links */}
      {externalLinks.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (i + 1) * 0.1 }}
          whileHover={{ scale: 1.1 }}
          className="group flex flex-col items-center gap-2 rounded-xl border border-card-border bg-card p-6 transition-all hover:border-cyan/30 hover:shadow-[0_0_20px_rgba(0,245,255,0.1)]"
        >
          <link.icon className="text-3xl text-foreground/50 transition-colors group-hover:text-cyan" />
          <span className="text-sm text-foreground/40 transition-colors group-hover:text-foreground/70">
            {link.label}
          </span>
        </motion.a>
      ))}
    </div>
  )
}
