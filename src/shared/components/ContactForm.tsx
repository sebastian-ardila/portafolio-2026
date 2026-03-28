import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaWhatsapp } from 'react-icons/fa'
import { HiChevronDown, HiCheck } from 'react-icons/hi'

const WHATSAPP_NUMBER = '573177822100'

interface Option {
  value: string
  labelKey: string
}

const PROJECT_TYPES: Option[] = [
  { value: 'Web Application', labelKey: 'contact.projectTypes.webapp' },
  { value: 'Landing Page', labelKey: 'contact.projectTypes.landing' },
  { value: 'Consulting', labelKey: 'contact.projectTypes.consulting' },
  { value: 'Team Augmentation', labelKey: 'contact.projectTypes.augmentation' },
  { value: 'Other', labelKey: 'contact.projectTypes.other' },
]

export function ContactForm() {
  const { t } = useTranslation('skills')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState('')
  const [message, setMessage] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  }, [dropdownOpen])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!projectType) return
    const text = `Hi, I'm ${name} (${email}). Project: ${projectType}. ${message}`
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const inputClass = 'w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/25 transition-colors focus:border-cyan/40 focus:outline-none'

  const selectedLabel = projectType
    ? t(PROJECT_TYPES.find((o) => o.value === projectType)!.labelKey)
    : null

  return (
    <div className="rounded-2xl border border-cyan/10 bg-gradient-to-b from-card to-background p-6">
      <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-cyan/10 px-3 py-1">
        <FaWhatsapp size={12} className="text-cyan" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-cyan">
          {t('contact.title')}
        </span>
      </div>
      <p className="mb-5 mt-2 text-sm leading-relaxed text-foreground/50">
        {t('contact.subtitle')}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('contact.namePlaceholder')}
          className={inputClass}
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('contact.emailPlaceholder')}
          className={inputClass}
        />

        {/* Custom dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`${inputClass} flex items-center justify-between text-left ${
              !projectType ? 'text-foreground/25' : 'text-foreground'
            }`}
          >
            <span className="truncate">
              {selectedLabel || t('contact.projectTypePlaceholder')}
            </span>
            <HiChevronDown
              size={16}
              className={`flex-shrink-0 text-foreground/30 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-card-border bg-background shadow-xl">
              {PROJECT_TYPES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setProjectType(option.value)
                    setDropdownOpen(false)
                  }}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-foreground/70 transition-colors hover:bg-cyan/5 hover:text-foreground"
                >
                  {t(option.labelKey)}
                  {projectType === option.value && (
                    <HiCheck size={14} className="text-cyan" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('contact.messagePlaceholder')}
          rows={3}
          className={`resize-none ${inputClass}`}
        />
        <button
          type="submit"
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-cyan px-5 py-3 text-sm font-semibold text-background transition-all duration-300 hover:bg-cyan/90 hover:shadow-[0_0_25px_rgba(0,245,255,0.25)]"
        >
          <FaWhatsapp size={18} />
          {t('contact.send')}
        </button>
      </form>
    </div>
  )
}
