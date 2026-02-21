import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '@/shared/components/SectionWrapper'
import { SkillCard } from './SkillCard'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectFilteredSkills,
  selectActiveCategory,
  setActiveCategory,
} from '../slices/skillsSlice'
import { SECTION_IDS } from '@/shared/utils/constants'
import { cn } from '@/shared/utils/cn'
import type { SkillCategory } from '@/app/types'

const categoryKeys: { key: string; value: SkillCategory | 'all' }[] = [
  { key: 'all', value: 'all' },
  { key: 'frontend', value: 'frontend' },
  { key: 'backend', value: 'backend' },
  { key: 'tools', value: 'tools' },
  { key: 'design', value: 'design' },
]

export function SkillsSection() {
  const dispatch = useAppDispatch()
  const filteredSkills = useAppSelector(selectFilteredSkills)
  const activeCategory = useAppSelector(selectActiveCategory)
  const { t } = useTranslation('skills')

  return (
    <SectionWrapper id={SECTION_IDS.SKILLS}>
      <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-cyan">
        {t('sectionLabel')}
      </h2>
      <h3 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h3>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categoryKeys.map((cat) => (
          <button
            key={cat.value}
            onClick={() => dispatch(setActiveCategory(cat.value))}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
              activeCategory === cat.value
                ? 'bg-cyan/20 text-cyan shadow-[0_0_15px_rgba(0,245,255,0.15)]'
                : 'text-foreground/50 hover:text-foreground/80'
            )}
          >
            {t(`categories.${cat.key}`)}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSkills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <SkillCard skill={skill} />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
