import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { AnimatedCard } from '@/shared/components/AnimatedCard'
import { useAppDispatch } from '@/app/hooks'
import { setSelectedProject } from '../slices/projectsSlice'
import type { IProject } from '@/app/types'

interface ProjectCardProps {
  project: IProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation('projects')

  const title = t(`items.${project.id}.title`, { defaultValue: project.title })
  const description = t(`items.${project.id}.description`, { defaultValue: project.description })

  return (
    <motion.div layoutId={`project-${project.id}`} className="flex h-full w-full">
      <AnimatedCard className="group flex h-full w-full cursor-pointer flex-col">
        <div
          className="mb-4 h-40 overflow-hidden rounded-lg"
          onClick={() => dispatch(setSelectedProject(project.id))}
        >
          <img
            src={project.image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <h4
          className="mb-2 cursor-pointer text-lg font-bold transition-colors hover:text-cyan"
          onClick={() => dispatch(setSelectedProject(project.id))}
        >
          {title}
        </h4>
        <p className="mb-4 flex-1 text-sm text-foreground/50">{description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-cyan/5 px-2.5 py-0.5 text-xs text-cyan/70"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-foreground/40 transition-colors hover:text-cyan"
            >
              <FaExternalLinkAlt size={12} /> {t('live')}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-foreground/40 transition-colors hover:text-cyan"
            >
              <FaGithub size={12} /> {t('code')}
            </a>
          )}
        </div>
      </AnimatedCard>
    </motion.div>
  )
}
