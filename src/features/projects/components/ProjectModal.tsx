import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectSelectedProject,
  setSelectedProject,
} from '../slices/projectsSlice'
import { GlowButton } from '@/shared/components/GlowButton'

export function ProjectModal() {
  const dispatch = useAppDispatch()
  const project = useAppSelector(selectSelectedProject)
  const { t } = useTranslation('projects')

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          onClick={() => dispatch(setSelectedProject(null))}
        >
          <motion.div
            layoutId={`project-${project.id}`}
            className="w-full max-w-2xl rounded-2xl border border-card-border bg-background p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold">
                  {t(`items.${project.id}.title`, { defaultValue: project.title })}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-cyan/10 px-3 py-1 text-xs text-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => dispatch(setSelectedProject(null))}
                className="text-foreground/40 transition-colors hover:text-foreground"
              >
                <HiX size={24} />
              </button>
            </div>

            <p className="mb-6 leading-relaxed text-foreground/70">
              {t(`items.${project.id}.longDescription`, { defaultValue: project.longDescription })}
            </p>

            <div className="flex gap-4">
              {project.liveUrl && (
                <GlowButton as="a" href={project.liveUrl} variant="primary">
                  <FaExternalLinkAlt size={14} /> {t('liveDemo')}
                </GlowButton>
              )}
              {project.repoUrl && (
                <GlowButton as="a" href={project.repoUrl} variant="secondary">
                  <FaGithub size={14} /> {t('sourceCode')}
                </GlowButton>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
