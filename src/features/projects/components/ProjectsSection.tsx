import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '@/shared/components/SectionWrapper'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectFilteredProjects,
  selectAllTechnologies,
  setActiveTech,
} from '../slices/projectsSlice'
import { SECTION_IDS } from '@/shared/utils/constants'
import { cn } from '@/shared/utils/cn'

export function ProjectsSection() {
  const dispatch = useAppDispatch()
  const projects = useAppSelector(selectFilteredProjects)
  const allTechs = useAppSelector(selectAllTechnologies)
  const activeTech = useAppSelector((s) => s.projects.activeTech)
  const { t } = useTranslation('projects')
  const { t: tc } = useTranslation('common')

  return (
    <SectionWrapper id={SECTION_IDS.PROJECTS}>
      <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-cyan">
        {t('sectionLabel')}
      </h2>
      <h3 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h3>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => dispatch(setActiveTech(null))}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium transition-all',
            !activeTech
              ? 'bg-cyan/20 text-cyan'
              : 'text-foreground/50 hover:text-foreground/80'
          )}
        >
          {tc('all')}
        </button>
        {allTechs.map((tech) => (
          <button
            key={tech}
            onClick={() =>
              dispatch(setActiveTech(tech === activeTech ? null : tech))
            }
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium transition-all',
              activeTech === tech
                ? 'bg-cyan/20 text-cyan'
                : 'text-foreground/50 hover:text-foreground/80'
            )}
          >
            {tech}
          </button>
        ))}
      </div>

      <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex"
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      <ProjectModal />
    </SectionWrapper>
  )
}
