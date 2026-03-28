import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaWhatsapp } from 'react-icons/fa'

const WHATSAPP_NUMBER = '573177822100'

export function ContactForm() {
  const { t } = useTranslation('skills')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = `Hi, I'm ${name} (${email}). Project: ${projectType}. ${message}`
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const inputClass = 'w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/25 transition-colors focus:border-cyan/40 focus:outline-none'

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
        <select
          required
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className={`${inputClass} ${!projectType ? 'text-foreground/25' : ''}`}
        >
          <option value="" disabled>{t('contact.projectTypePlaceholder')}</option>
          <option value="Web Application">{t('contact.projectTypes.webapp')}</option>
          <option value="Landing Page">{t('contact.projectTypes.landing')}</option>
          <option value="Consulting">{t('contact.projectTypes.consulting')}</option>
          <option value="Team Augmentation">{t('contact.projectTypes.augmentation')}</option>
          <option value="Other">{t('contact.projectTypes.other')}</option>
        </select>
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
