import { useRef, useEffect, useLayoutEffect, useState, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setInput, submitCommand, navigateHistory, addLine, setPickerMode } from '../slices/terminalSlice'
import { useTerminalCommands } from '../hooks/useTerminalCommands'
import { profile } from '@/config/profile'

const COMMANDS = [
  'about',
  'skills',
  'experience',
  'contact',
  'resume',
  'book',
  'help',
  'clear',
  'exit',
  'sudo hire-sebastian',
]

interface DropdownPosition {
  anchorTop: number
  anchorBottom: number
  left: number
  width: number
}

function ResumePicker() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation('terminal')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const options = useMemo(() => [
    { label: t('resume.en'), url: profile.resumeUrl },
    { label: t('resume.es'), url: profile.resumeUrlEs },
  ], [t])

  const selectOption = useCallback((url: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = ''
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.click()
    dispatch(addLine({ type: 'output', text: t('resume.downloading') }))
    dispatch(setPickerMode(null))
  }, [dispatch, t])

  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev === 0 ? 1 : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      selectOption(options[selectedIndex].url)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      dispatch(setPickerMode(null))
    }
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="outline-none"
    >
      <div className="mt-1 space-y-0.5">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => selectOption(opt.url)}
            onMouseEnter={() => setSelectedIndex(i)}
            className={`flex w-full cursor-pointer items-center gap-2 rounded px-3 py-2.5 text-left font-mono text-xs transition-colors sm:py-1.5 ${
              i === selectedIndex
                ? 'bg-cyan/10 text-cyan'
                : 'text-foreground/50 hover:bg-cyan/5'
            }`}
          >
            <span className={i === selectedIndex ? 'text-cyan' : 'text-foreground/30'}>
              {i === selectedIndex ? '▸' : ' '}
            </span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function TerminalInput() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation('terminal')
  const input = useAppSelector((s) => s.terminal.currentInput)
  const isMaximized = useAppSelector((s) => s.terminal.isMaximized)
  const isMinimized = useAppSelector((s) => s.terminal.isMinimized)
  const bookingOpen = useAppSelector((s) => s.booking.isOpen)
  const pickerMode = useAppSelector((s) => s.terminal.pickerMode)
  const execute = useTerminalCommands()
  const inputRef = useRef<HTMLInputElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [dropdownPos, setDropdownPos] = useState<DropdownPosition | null>(null)

  const suggestions = useMemo(() => {
    if (pickerMode) return []
    const trimmed = input.trim().toLowerCase()
    if (!trimmed) return []
    return COMMANDS.filter((cmd) => cmd.includes(trimmed) && cmd !== trimmed)
  }, [input, pickerMode])

  // Pre-select first suggestion when suggestions change
  useEffect(() => {
    setSelectedIndex(suggestions.length > 0 ? 0 : -1)
  }, [suggestions])

  // Calculate dropdown position relative to viewport
  useLayoutEffect(() => {
    if (suggestions.length === 0 || !anchorRef.current) {
      setDropdownPos(null)
      return
    }

    function updatePosition() {
      if (!anchorRef.current) return
      const rect = anchorRef.current.getBoundingClientRect()
      setDropdownPos({
        anchorTop: rect.top,
        anchorBottom: rect.bottom,
        left: rect.left,
        width: rect.width,
      })
    }

    updatePosition()

    const terminalBody = anchorRef.current.closest('[data-terminal-body]')
    if (terminalBody) {
      const hideOnScroll = () => setDropdownPos(null)
      terminalBody.addEventListener('scroll', hideOnScroll, { passive: true })
      return () => terminalBody.removeEventListener('scroll', hideOnScroll)
    }
  }, [suggestions])

  const isOpen = useAppSelector((s) => s.terminal.isOpen)

  const focusInput = useCallback(() => {
    if (!pickerMode) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [pickerMode])

  useEffect(() => {
    focusInput()
  }, [focusInput, isOpen, isMaximized, isMinimized, bookingOpen])

  function selectSuggestion(cmd: string) {
    dispatch(setInput(cmd))
    inputRef.current?.focus()
  }

  function executeCommand(cmd: string) {
    dispatch(setInput(cmd))
    setTimeout(() => {
      dispatch(submitCommand())
      execute(cmd)
    }, 0)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        return
      }
      if (e.key === 'Tab') {
        e.preventDefault()
        const idx = selectedIndex >= 0 ? selectedIndex : 0
        selectSuggestion(suggestions[idx])
        return
      }
      if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault()
        executeCommand(suggestions[selectedIndex])
        return
      }
    }

    if (e.key === 'Enter') {
      dispatch(submitCommand())
      execute(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      dispatch(navigateHistory('up'))
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      dispatch(navigateHistory('down'))
    }
  }

  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownAbove, setDropdownAbove] = useState(true)

  // After the dropdown renders, measure it and decide above vs below
  useLayoutEffect(() => {
    if (!dropdownPos || !dropdownRef.current) return
    const dropdownHeight = dropdownRef.current.offsetHeight
    const spaceAbove = dropdownPos.anchorTop
    const spaceBelow = window.innerHeight - dropdownPos.anchorBottom

    // Prefer above, but flip to below if not enough space above and more space below
    setDropdownAbove(spaceAbove >= dropdownHeight + 4 || spaceAbove >= spaceBelow)
  }, [dropdownPos, suggestions])

  const suggestionsDropdown =
    suggestions.length > 0 && dropdownPos
      ? createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'fixed',
              zIndex: 9999,
              ...(dropdownAbove
                ? { bottom: `${window.innerHeight - dropdownPos.anchorTop + 4}px` }
                : { top: `${dropdownPos.anchorBottom + 4}px` }),
              left: `${Math.max(4, Math.min(dropdownPos.left, window.innerWidth - dropdownPos.width - 4))}px`,
              width: `${Math.min(dropdownPos.width, window.innerWidth - 8)}px`,
            }}
            className="overflow-hidden rounded-md border border-foreground/20 bg-[#0d0d14] shadow-lg"
          >
            {suggestions.map((cmd, i) => {
              const typed = input.trim().toLowerCase()
              const matchIndex = cmd.indexOf(typed)
              return (
                <button
                  key={cmd}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    executeCommand(cmd)
                  }}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`block w-full px-3 py-2.5 text-left font-mono text-xs transition-colors sm:py-1.5 ${
                    i === selectedIndex
                      ? 'bg-cyan/10'
                      : 'hover:bg-cyan/5'
                  }`}
                >
                  <span className="text-foreground/40">{cmd.slice(0, matchIndex)}</span>
                  <span className="text-cyan">{cmd.slice(matchIndex, matchIndex + typed.length)}</span>
                  <span className="text-foreground/40">{cmd.slice(matchIndex + typed.length)}</span>
                </button>
              )
            })}
          </div>,
          document.body
        )
      : null

  if (pickerMode === 'resume') {
    return (
      <div ref={anchorRef}>
        <ResumePicker />
      </div>
    )
  }

  return (
    <div ref={anchorRef}>
      {suggestionsDropdown}

      {/* Input line */}
      <div className="flex items-center gap-2">
        <span className="text-cyan">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => dispatch(setInput(e.target.value))}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent font-mono text-base text-cyan outline-none sm:text-sm"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        />
        <span className="h-4 w-2 animate-pulse bg-cyan" />
      </div>

      {/* Enter hint — visible when user has typed something */}
      {input.trim().length > 0 && (
        <div className="mt-1 flex items-center gap-1.5 pl-5 font-mono text-[10px] text-foreground/25">
          <span>{t('enterHint')}</span>
          <span className="text-[9px]">↵</span>
        </div>
      )}
    </div>
  )
}
