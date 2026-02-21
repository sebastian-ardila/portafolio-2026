import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '@/shared/components/SectionWrapper'
import { Timeline } from './Timeline'
import { SECTION_IDS } from '@/shared/utils/constants'

export function ExperienceSection() {
  const { t } = useTranslation('experience')

  return (
    <SectionWrapper id={SECTION_IDS.EXPERIENCE}>
      <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-cyan">
        {t('sectionLabel')}
      </h2>
      <h3 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h3>
      <Timeline />
    </SectionWrapper>
  )
}
