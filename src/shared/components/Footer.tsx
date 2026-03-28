import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiChat } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/app/hooks'
import { openTerminal } from '@/features/terminal/slices/terminalSlice'
import { profile } from '@/config/profile'

export function Footer() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation('common')

  return (
    <footer className="border-t border-card-border bg-background/50 px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-foreground/40">
          {t('footer.copyright', { year: new Date().getFullYear(), name: profile.name })}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/40 transition-colors hover:text-cyan"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/40 transition-colors hover:text-cyan"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <button
            onClick={() => dispatch(openTerminal())}
            className="text-foreground/40 transition-colors hover:text-cyan"
            aria-label="Contact"
          >
            <HiChat size={20} />
          </button>
        </div>
      </div>
    </footer>
  )
}
