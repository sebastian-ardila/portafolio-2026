import { TypeAnimation } from 'react-type-animation'
import { useTranslation } from 'react-i18next'

export function TypingIntro() {
  const { t, i18n } = useTranslation('hero')
  const roles = t('roles', { returnObjects: true }) as string[]

  const sequence = roles.flatMap((role) => [role, 2000])

  return (
    <TypeAnimation
      key={i18n.language}
      sequence={sequence}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="text-xl font-medium text-cyan sm:text-2xl md:text-3xl"
    />
  )
}
