import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SectionWrapper } from '@/shared/components/SectionWrapper'
import { SECTION_IDS } from '@/shared/utils/constants'
import { skills } from '@/config/skills'

const topSkills = [...skills]
  .sort((a, b) => b.years - a.years)
  .slice(0, 14)

export function SkillsSection() {
  const { t } = useTranslation('skills')

  return (
    <SectionWrapper id={SECTION_IDS.SKILLS}>
      <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-cyan">
        {t('sectionLabel')}
      </h2>
      <h3 className="mb-10 text-center text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h3>

      <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-2">
        {topSkills.map((skill, i) => (
          <motion.span
            key={skill.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="text-sm text-foreground/50"
          >
            {skill.name}
            {i < topSkills.length - 1 && (
              <span className="ml-3 text-foreground/15">·</span>
            )}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-center"
      >
        <Link
          to="/skills"
          className="font-mono text-xs text-foreground/30 transition-colors hover:text-cyan"
        >
          {t('viewMore')}
        </Link>
      </motion.div>
    </SectionWrapper>
  )
}
