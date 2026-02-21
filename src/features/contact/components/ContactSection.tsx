import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '@/shared/components/SectionWrapper'
import { SocialLinks } from './SocialLinks'
import { SECTION_IDS } from '@/shared/utils/constants'

export function ContactSection() {
  const { t } = useTranslation('contact')

  return (
    <SectionWrapper id={SECTION_IDS.CONTACT}>
      <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-cyan">
        {t('sectionLabel')}
      </h2>
      <h3 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h3>
      <p className="mx-auto mb-12 max-w-lg text-center text-foreground/50">
        {t('description')}
      </p>

      <SocialLinks />
    </SectionWrapper>
  )
}
