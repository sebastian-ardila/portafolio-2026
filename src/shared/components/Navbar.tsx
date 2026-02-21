import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { useScrollSpy } from '@/shared/hooks/useScrollSpy'
import { SECTION_IDS } from '@/shared/utils/constants'
import { cn } from '@/shared/utils/cn'
import { LanguageSelector } from './LanguageSelector'

const NAV_KEYS = [
  { key: 'about', href: `#${SECTION_IDS.ABOUT}` },
  { key: 'skills', href: `#${SECTION_IDS.SKILLS}` },
  { key: 'experience', href: `#${SECTION_IDS.EXPERIENCE}` },
  { key: 'projects', href: `#${SECTION_IDS.PROJECTS}` },
  { key: 'contact', href: `#${SECTION_IDS.CONTACT}` },
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useScrollSpy()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { t } = useTranslation('common')

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-b border-card-border bg-background/80 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-lg font-bold tracking-tight">
          <span className="text-cyan">&lt;</span>
          SA
          <span className="text-cyan">/&gt;</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {isHome &&
            NAV_KEYS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-cyan',
                  activeSection === link.href.slice(1)
                    ? 'text-cyan'
                    : 'text-foreground/60'
                )}
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          {!isHome && (
            <Link
              to="/"
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-cyan"
            >
              {t('nav.home')}
            </Link>
          )}
          <Link
            to="/blog"
            className={cn(
              'text-sm font-medium transition-colors hover:text-cyan',
              location.pathname.startsWith('/blog')
                ? 'text-cyan'
                : 'text-foreground/60'
            )}
          >
            {t('nav.blog')}
          </Link>
          <LanguageSelector />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSelector />
          <button
            className="text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-card-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-4">
              {isHome &&
                NAV_KEYS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-foreground/60 transition-colors hover:text-cyan"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                ))}
              <Link
                to="/blog"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground/60 transition-colors hover:text-cyan"
              >
                {t('nav.blog')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
