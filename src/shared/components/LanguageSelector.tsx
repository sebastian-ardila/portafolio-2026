import { useTranslation } from 'react-i18next'

export function LanguageSelector() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith('es') ? 'es' : 'en'

  function toggle() {
    const newLang = currentLang === 'en' ? 'es' : 'en'
    i18n.changeLanguage(newLang)
    document.documentElement.lang = newLang
  }

  return (
    <button
      onClick={toggle}
      className="rounded-full border border-card-border px-2.5 py-1 font-mono text-xs text-foreground/50 transition-all hover:border-cyan/30 hover:text-cyan"
      aria-label="Toggle language"
    >
      {currentLang === 'en' ? 'ES' : 'EN'}
    </button>
  )
}
