import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiX } from 'react-icons/hi'
import { ContactForm } from '@/shared/components/ContactForm'
import {
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, SiHtml5,
  SiTailwindcss, SiRedux, SiGit,
  SiFigma, SiGraphql,
  SiSocketdotio, SiMongodb, SiExpress,
  SiJest, SiConfluence, SiOpenapiinitiative, SiAntdesign,
  SiNextdotjs, SiGooglesearchconsole, SiPostgresql, SiPython,
  SiDocker, SiKubernetes, SiAmazons3, SiAmazonwebservices,
  SiAmazonec2, SiAmazonecs, SiGithubactions, SiOpenai,
  SiAnthropic, SiGooglegemini, SiVercel,
} from 'react-icons/si'
import {
  HiUsers, HiLightningBolt, HiChartBar, HiRefresh,
  HiPuzzle, HiScale, HiDocumentSearch, HiEye,
} from 'react-icons/hi'
import { SectionWrapper } from '@/shared/components/SectionWrapper'
import { useAppSelector } from '@/app/hooks'
import {
  selectFilteredSkills,
} from '@/features/skills/slices/skillsSlice'
import type { ISkill } from '@/app/types'
import type { IconType } from 'react-icons'

const iconMap: Record<string, IconType> = {
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, SiHtml5,
  SiTailwindcss, SiRedux, SiGit,
  SiFigma, SiGraphql,
  SiSocketdotio, SiMongodb, SiExpress,
  SiJest, SiConfluence, SiOpenapiinitiative, SiAntdesign,
  SiNextdotjs, SiGooglesearchconsole, SiPostgresql, SiPython,
  SiDocker, SiKubernetes, SiAmazons3, SiAmazonwebservices,
  SiAmazonec2, SiAmazonecs, SiGithubactions, SiOpenai,
  SiAnthropic, SiGooglegemini, SiVercel,
  HiUsers, HiLightningBolt, HiChartBar, HiRefresh,
  HiPuzzle, HiScale, HiDocumentSearch, HiEye,
}

function SkillModal({ skill, onClose }: { skill: ISkill; onClose: () => void }) {
  const { t } = useTranslation('skills')
  const Icon = iconMap[skill.icon]
  const description = t(`descriptions.${skill.name}`, { defaultValue: skill.description })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-2xl border border-card-border bg-background p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {Icon && <Icon className="text-3xl text-cyan" />}
            <div>
              <h3 className="text-xl font-bold">{skill.name}</h3>
              <span className="text-xs text-foreground/40">
                {skill.years} {skill.years === 1 ? 'year' : 'years'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-foreground/40 transition-colors hover:text-foreground"
          >
            <HiX size={24} />
          </button>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-foreground/60">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {skill.usedAt.map((company) => (
            <span
              key={company}
              className="rounded-full bg-cyan/5 px-2.5 py-0.5 text-xs text-cyan/70"
            >
              {company}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function SkillsPage() {
  const filteredSkills = useAppSelector(selectFilteredSkills)
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null)

  return (
    <SectionWrapper id="skills-page">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row">
        {/* Contact form — left, sticky */}
        <div className="w-full shrink-0 md:w-96">
          <div className="sticky top-[100px]">
            <ContactForm />
          </div>
        </div>

        {/* Skills list — right */}
        <div className="flex-1">
          <div className="space-y-1">
            {filteredSkills.map((skill, i) => {
              const Icon = iconMap[skill.icon]
              return (
                <motion.button
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setSelectedSkill(skill)}
                  className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
                >
                  {Icon && (
                    <Icon className="flex-shrink-0 text-lg text-cyan/60 transition-colors group-hover:text-cyan" />
                  )}
                  <span className="flex-1 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground/90">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs text-foreground/25">
                    {skill.years}y
                  </span>
                  {skill.isCore && (
                    <span className="rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-amber-500/60">
                      core
                    </span>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedSkill && (
          <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
