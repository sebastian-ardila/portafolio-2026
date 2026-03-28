import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { SectionWrapper } from '@/shared/components/SectionWrapper'
import { SECTION_IDS } from '@/shared/utils/constants'
import { projects } from '@/config/projects'
export function ProjectsSection() {
  const { t } = useTranslation('projects')

  return (
    <SectionWrapper id={SECTION_IDS.PROJECTS}>
      <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-cyan">
        {t('sectionLabel')}
      </h2>
      <h3 className="mb-10 text-center text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-card-border text-left text-[10px] font-semibold uppercase tracking-widest text-foreground/30">
              <th className="pb-3 pr-4" />
              <th className="pb-3 pr-4 sm:w-[40%]">{t('tableProject')}</th>
              <th className="hidden pb-3 sm:table-cell">{t('tableSkills')}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, i) => {
              const title = t(`items.${project.id}.title`, { defaultValue: project.title })
              const iconSrc = project.icon
                || (project.repoUrl ? undefined : project.image)

              return (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="group border-b border-card-border/50 transition-colors hover:bg-white/[0.02]"
                >
                  {/* Icon/Logo */}
                  <td className="py-3 pr-3">
                    {iconSrc?.startsWith('emoji:') ? (
                      <span className="text-xl sm:text-2xl">{iconSrc.slice(6)}</span>
                    ) : iconSrc ? (
                      <img
                        src={iconSrc}
                        alt={title}
                        className="h-6 w-6 rounded object-contain sm:h-7 sm:w-7"
                      />
                    ) : (
                      <FaGithub className="h-6 w-6 text-foreground/30 sm:h-7 sm:w-7" />
                    )}
                  </td>

                  {/* Project name + type + links */}
                  <td className="py-3 pr-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground/90">
                        {title}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.liveUrls?.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-white/[0.02] px-3 py-1.5 text-xs text-foreground/40 transition-all hover:border-cyan/30 hover:text-cyan sm:px-2 sm:py-0.5 sm:text-[10px]"
                          >
                            <FaExternalLinkAlt size={8} />
                            {link.label}
                          </a>
                        ))}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-white/[0.02] px-3 py-1.5 text-xs text-foreground/40 transition-all hover:border-cyan/30 hover:text-cyan sm:px-2 sm:py-0.5 sm:text-[10px]"
                          >
                            <FaGithub size={9} />
                            {t('code')}
                          </a>
                        )}
                      </div>
                      {/* Mobile skills */}
                      <div className="mt-1 flex flex-wrap gap-1 sm:hidden">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] text-foreground/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Technologies */}
                  <td className="hidden py-3 sm:table-cell">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-cyan/5 px-2 py-0.5 text-[10px] text-foreground/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  )
}
