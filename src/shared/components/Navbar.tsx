import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX, HiCode, HiUser, HiBriefcase, HiBookOpen, HiHome, HiCollection, HiMail } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { useScrollSpy } from '@/shared/hooks/useScrollSpy'
import { SECTION_IDS } from '@/shared/utils/constants'
import { cn } from '@/shared/utils/cn'
import { LanguageSelector } from './LanguageSelector'
import type { IconType } from 'react-icons'

interface NavLinkItem {
  key: string
  to: string
  icon: IconType
  matchFn?: (path: string) => boolean
}

const PAGE_LINKS: NavLinkItem[] = [
  { key: 'skills', to: '/skills', icon: HiCode },
  { key: 'about', to: '/about', icon: HiUser },
  { key: 'experience', to: '/experience', icon: HiBriefcase },
  { key: 'blog', to: '/blog', icon: HiBookOpen, matchFn: (p) => p.startsWith('/blog') },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useScrollSpy()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { t } = useTranslation('common')

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (link: NavLinkItem) =>
    link.matchFn ? link.matchFn(location.pathname) : location.pathname === link.to

  return (
    <>
      {/* Top bar — always visible */}
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
          <div className="hidden items-center gap-6 md:flex">
            {isHome && (
              <>
                <a
                  href={`#${SECTION_IDS.PROJECTS}`}
                  className={cn(
                    'flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-cyan',
                    activeSection === SECTION_IDS.PROJECTS ? 'text-cyan' : 'text-foreground/60'
                  )}
                >
                  <HiCollection size={14} />
                  {t('nav.projects')}
                </a>
                <a
                  href={`#${SECTION_IDS.CONTACT}`}
                  className={cn(
                    'flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-cyan',
                    activeSection === SECTION_IDS.CONTACT ? 'text-cyan' : 'text-foreground/60'
                  )}
                >
                  <HiMail size={14} />
                  {t('nav.contact')}
                </a>
              </>
            )}
            {!isHome && (
              <Link
                to="/"
                className="flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-cyan"
              >
                <HiHome size={14} />
                {t('nav.home')}
              </Link>
            )}
            {PAGE_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-cyan',
                  isActive(link) ? 'text-cyan' : 'text-foreground/60'
                )}
              >
                <link.icon size={14} />
                {t(`nav.${link.key}`)}
              </Link>
            ))}
            <LanguageSelector />
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSelector />
            <button
              className="text-2xl"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <HiMenuAlt3 />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu — fullscreen overlay, separate from nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ backgroundColor: '#0a0a12', position: 'fixed', inset: 0, zIndex: 9999 }}
            className="flex flex-col md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <Link to="/" onClick={() => setMobileOpen(false)} className="text-lg font-bold tracking-tight">
                <span className="text-cyan">&lt;</span>
                SA
                <span className="text-cyan">/&gt;</span>
              </Link>
              <button
                className="rounded-full border border-card-border p-2 text-foreground/60 transition-colors hover:border-cyan/30 hover:text-cyan"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <HiX size={20} />
              </button>
            </div>

            {/* All nav links — always the same regardless of current page */}
            <div className="flex flex-col gap-1 px-6 pt-4">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-white/[0.04]',
                  isHome ? 'text-cyan' : 'text-foreground/60 hover:text-cyan'
                )}
              >
                <HiHome size={20} className={isHome ? 'text-cyan' : 'text-foreground/30'} />
                {t('nav.home')}
              </Link>
              {PAGE_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-white/[0.04]',
                    isActive(link) ? 'text-cyan' : 'text-foreground/60 hover:text-cyan'
                  )}
                >
                  <link.icon size={20} className={isActive(link) ? 'text-cyan' : 'text-foreground/30'} />
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto flex items-center gap-4 px-10 py-8">
              <LanguageSelector />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
