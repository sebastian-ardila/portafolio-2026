import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '@/shared/components/SectionWrapper'

export function MyLifePage() {
  const { t } = useTranslation('common')

  return (
    <SectionWrapper id="my-life">
      <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-cyan">
        {t('nav.myLife')}
      </h2>
      <h3 className="mb-10 text-center text-3xl font-bold sm:text-4xl">
        Coming soon...
      </h3>
    </SectionWrapper>
  )
}
