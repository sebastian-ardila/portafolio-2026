import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTerminal } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  openTerminal,
  minimizeTerminal,
  restoreTerminal,
  toggleMaximize,
  setInput,
  submitCommand,
} from '../slices/terminalSlice'
import { useKonamiCode } from '../hooks/useKonamiCode'
import { useTerminalCommands } from '../hooks/useTerminalCommands'
import { TerminalInput } from './TerminalInput'
import { Tooltip } from '@/shared/components/Tooltip'

function TerminalLine({ text }: { text: string }) {
  // Headings / titles (match translated versions too)
  if (/^(Available commands|Comandos disponibles)/.test(text) || text.startsWith('\uD83C\uDF89') || text.startsWith('\u2705'))
    return <span className="text-cyan">{text}</span>

  // Progress bars
  if (text.includes('\u2588\u2588\u2588\u2588'))
    return <span className="text-purple">{text}</span>

  // Command list: "  command  — description"
  const cmdMatch = text.match(/^(\s{2})(\S+(?:\s\S+)?)(\s+)(\u2014\s.+)$/)
  if (cmdMatch) {
    return (
      <>
        <span>{cmdMatch[1]}</span>
        <span className="text-cyan">{cmdMatch[2]}</span>
        <span>{cmdMatch[3]}</span>
        <span className="text-foreground/40">{cmdMatch[4]}</span>
      </>
    )
  }

  // Skill bars: "  Skill   ████  N yrs"
  const skillMatch = text.match(/^(\s{2}\S+(?:\s\S+)?)\s+(\u2588+)\s+(.+)$/)
  if (skillMatch) {
    return (
      <>
        <span className="text-foreground/70">{skillMatch[1]}  </span>
        <span className="text-cyan">{skillMatch[2]}</span>
        <span className="text-foreground/40">  {skillMatch[3]}</span>
      </>
    )
  }

  // Experience: "  YEAR  Role  Company"
  const expMatch = text.match(/^(\s{2}\S+(?:-\S+)?)\s{2,}(.+?)\s{2,}(.+)$/)
  if (expMatch) {
    return (
      <>
        <span className="text-cyan/60">{expMatch[1]}  </span>
        <span className="text-foreground/70">{expMatch[2]}  </span>
        <span className="text-foreground/40">{expMatch[3]}</span>
      </>
    )
  }

  // Key: value pairs
  const kvMatch = text.match(/^(\w[\w\s]*?):\s+(.+)$/)
  if (kvMatch) {
    return (
      <>
        <span className="text-foreground/50">{kvMatch[1]}: </span>
        <span className="text-cyan/80">{kvMatch[2]}</span>
      </>
    )
  }

  // Default
  return <span className="text-foreground/60">{text}</span>
}

export function TerminalOverlay() {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((s) => s.terminal.isOpen)
  const isMinimized = useAppSelector((s) => s.terminal.isMinimized)
  const isMaximized = useAppSelector((s) => s.terminal.isMaximized)
  const history = useAppSelector((s) => s.terminal.history)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)
  const { t, i18n } = useTranslation('terminal')
  const currentLang = i18n.language?.startsWith('es') ? 'es' : 'en'
  const execute = useTerminalCommands()

  const runCommand = useCallback((cmd: string) => {
    dispatch(setInput(cmd))
    setTimeout(() => {
      dispatch(submitCommand())
      execute(cmd)
    }, 0)
  }, [dispatch, execute])

  const handleKonami = useCallback(() => {
    dispatch(openTerminal())
  }, [dispatch])

  useKonamiCode(handleKonami)

  const [fabBottom, setFabBottom] = useState(16)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Keep the minimized tab within the visual viewport on mobile
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    const update = () => {
      // offsetTop accounts for the browser chrome pushing the viewport down
      const bottomInset = window.innerHeight - (vv.offsetTop + vv.height)
      setFabBottom(16 + Math.max(0, bottomInset))
    }

    update()
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)
    return () => {
      vv.removeEventListener('resize', update)
      vv.removeEventListener('scroll', update)
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') dispatch(minimizeTerminal())
    }
    if (isOpen && !isMinimized) {
      window.addEventListener('keydown', handleEsc)
      return () => window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, isMinimized, dispatch])

  // Lock page scroll while terminal is open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isOpen, isMinimized])

  return (
    <>
      {/* Minimized tab — shown when terminal is not expanded */}
      <AnimatePresence>
        {(!isOpen || isMinimized) && (
          <motion.button
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => isOpen ? dispatch(restoreTerminal()) : dispatch(openTerminal())}
            style={{ bottom: `${fabBottom}px` }}
            className="fixed left-4 z-50 flex items-center gap-2 rounded-lg border border-cyan/20 bg-[#0d0d14] px-4 py-2 font-mono text-xs text-cyan shadow-[0_0_20px_rgba(0,245,255,0.1)] transition-all hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)]"
          >
            <FaTerminal size={12} />
            sebastian.terminal
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full terminal */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ height: '100dvh' }}
            className="fixed inset-x-0 top-0 z-50 flex items-end justify-center bg-background/90 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) dispatch(minimizeTerminal())
            }}
          >
            <div className={`flex w-full flex-col items-center ${isMaximized ? 'h-full w-full' : 'h-full sm:h-auto sm:max-w-2xl'}`}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className={`flex flex-col overflow-hidden border-cyan/20 bg-[#0d0d14] shadow-[0_0_40px_rgba(0,245,255,0.1)] transition-all duration-300 sm:rounded-xl sm:border ${
                isMaximized ? 'h-full w-full' : 'h-full w-full sm:h-auto'
              }`}
            >
              {/* Title bar */}
              <div className="flex shrink-0 items-center border-b border-card-border px-4 py-2">
                <div className="flex items-center gap-2">
                  <Tooltip content={t('tooltips.minimize')} position="bottom">
                    <button
                      onClick={() => dispatch(minimizeTerminal())}
                      className="group relative h-3 w-3 cursor-pointer select-none rounded-full bg-yellow-500/60 transition-all hover:scale-125 hover:bg-yellow-500"
                      aria-label="Minimize terminal"
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-transparent transition-colors group-hover:text-yellow-900">
                        &minus;
                      </span>
                    </button>
                  </Tooltip>
                  {/* Desktop: functional maximize. Mobile: disabled with tooltip */}
                  <Tooltip content={t(isMobile ? 'tooltips.maximizeDisabled' : 'tooltips.maximize')} position="bottom">
                    <button
                      onClick={() => {
                        if (!isMobile) dispatch(toggleMaximize())
                      }}
                      className={`group relative h-3 w-3 select-none rounded-full transition-all ${
                        isMobile
                          ? 'cursor-not-allowed bg-green-500/20'
                          : 'cursor-pointer bg-green-500/60 hover:scale-125 hover:bg-green-500'
                      }`}
                      aria-label="Maximize terminal"
                    >
                      <span className={`absolute inset-0 flex items-center justify-center text-[6px] font-bold text-transparent transition-colors ${
                        isMobile ? '' : 'group-hover:text-green-900'
                      }`}>
                        ⤢
                      </span>
                    </button>
                  </Tooltip>
                </div>
                <span className="flex-1 text-center font-mono text-xs text-foreground/30">
                  sebastian.terminal
                </span>
                {/* Spacer to balance the dots */}
                <div className="w-[36px]" />
              </div>

              {/* Terminal body */}
              <div
                ref={scrollRef}
                data-terminal-body
                className={`min-h-0 flex-1 overflow-y-auto p-3 font-mono text-sm leading-relaxed transition-all duration-300 sm:p-4 ${
                  isMaximized ? '' : 'sm:h-80 sm:flex-none'
                }`}
              >
                {history.map((line, i) => {
                  // Resolve i18nKey if present
                  const displayText = line.i18nKey ? t(line.i18nKey) : line.text

                  return line.type === 'input' ? (
                    <div key={i} className="text-cyan">{displayText}</div>
                  ) : (
                    <div key={i} className="whitespace-pre-wrap">
                      {displayText.split('\n').map((row, j) => (
                        <div key={j}>
                          <TerminalLine text={row} />
                        </div>
                      ))}
                    </div>
                  )
                })}
                <TerminalInput />
              </div>

              {/* Quick commands — inside the terminal card on mobile */}
              {!isMaximized && (
                <div className="shrink-0 border-t border-card-border px-3 py-2 font-mono text-xs sm:hidden">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => runCommand('book')}
                      className="cursor-pointer text-cyan/60 transition-all active:text-cyan"
                    >
                      {t('quickCommands.book')}
                    </button>
                    <span className="text-foreground/20">|</span>
                    <button
                      onClick={() => runCommand('about')}
                      className="cursor-pointer text-cyan/60 transition-all active:text-cyan"
                    >
                      {t('quickCommands.about')}
                    </button>
                    <span className="text-foreground/20">|</span>
                    <button
                      onClick={() => runCommand('help')}
                      className="cursor-pointer text-cyan/60 transition-all active:text-cyan"
                    >
                      help
                    </button>
                    <span className="flex-1" />
                    <button
                      onClick={() => i18n.changeLanguage('es')}
                      className={`cursor-pointer transition-all ${currentLang === 'es' ? 'text-cyan' : 'text-cyan/60'}`}
                    >
                      ES
                    </button>
                    <span className="text-foreground/20">|</span>
                    <button
                      onClick={() => i18n.changeLanguage('en')}
                      className={`cursor-pointer transition-all ${currentLang === 'en' ? 'text-cyan' : 'text-cyan/60'}`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Quick commands — below card on desktop */}
            {!isMaximized && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-2 hidden w-full items-center gap-3 px-1 font-mono text-xs sm:flex"
              >
                <button
                  onClick={() => runCommand('book')}
                  className="cursor-pointer text-cyan/60 underline-offset-4 transition-all hover:text-cyan hover:underline"
                >
                  {t('quickCommands.book')}
                </button>
                <span className="text-foreground/20">|</span>
                <button
                  onClick={() => runCommand('about')}
                  className="cursor-pointer text-cyan/60 underline-offset-4 transition-all hover:text-cyan hover:underline"
                >
                  {t('quickCommands.about')}
                </button>
                <span className="flex-1" />
                <button
                  onClick={() => i18n.changeLanguage('es')}
                  className={`cursor-pointer underline-offset-4 transition-all hover:text-cyan hover:underline ${
                    currentLang === 'es' ? 'text-cyan' : 'text-cyan/60'
                  }`}
                >
                  ES
                </button>
                <span className="text-foreground/20">|</span>
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={`cursor-pointer underline-offset-4 transition-all hover:text-cyan hover:underline ${
                    currentLang === 'en' ? 'text-cyan' : 'text-cyan/60'
                  }`}
                >
                  EN
                </button>
                <span className="text-foreground/20">|</span>
                <button
                  onClick={() => runCommand('help')}
                  className="cursor-pointer text-cyan/60 underline-offset-4 transition-all hover:text-cyan hover:underline"
                >
                  help
                </button>
              </motion.div>
            )}
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
