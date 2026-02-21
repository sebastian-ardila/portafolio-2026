import {
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, SiHtml5,
  SiTailwindcss, SiRedux, SiGit,
  SiFigma, SiGraphql,
  SiSocketdotio, SiMongodb, SiExpress,
  SiJest, SiConfluence, SiOpenapiinitiative, SiAntdesign,
} from 'react-icons/si'
import { useTranslation } from 'react-i18next'
import { AnimatedCard } from '@/shared/components/AnimatedCard'
import { AchievementBadge } from './AchievementBadge'
import type { ISkill } from '@/app/types'
import type { IconType } from 'react-icons'

const iconMap: Record<string, IconType> = {
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, SiHtml5,
  SiTailwindcss, SiRedux, SiGit,
  SiFigma, SiGraphql,
  SiSocketdotio, SiMongodb, SiExpress,
  SiJest, SiConfluence, SiOpenapiinitiative, SiAntdesign,
}

interface SkillCardProps {
  skill: ISkill
}

export function SkillCard({ skill }: SkillCardProps) {
  const Icon = iconMap[skill.icon]
  const { t } = useTranslation('skills')

  const description = t(`descriptions.${skill.name}`, { defaultValue: skill.description })

  return (
    <AnimatedCard className="group relative flex h-full flex-col" tilt={true}>
      {skill.isCore && <AchievementBadge />}

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/0 to-transparent transition-all duration-300 group-hover:via-cyan/40" />

      <div className="mb-3 flex items-center gap-3">
        {Icon && (
          <Icon className="text-2xl text-cyan transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]" />
        )}
        <div>
          <h4 className="font-semibold">{skill.name}</h4>
          <span className="text-xs text-foreground/40">
            {skill.years} {skill.years === 1 ? 'year' : 'years'}
          </span>
        </div>
      </div>

      <p className="mb-3 text-xs leading-relaxed text-foreground/50">
        {description}
      </p>

      <div className="mt-auto flex flex-wrap gap-1.5">
        {skill.usedAt.map((company) => (
          <span
            key={company}
            className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-foreground/50 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-foreground/60"
          >
            {company}
          </span>
        ))}
      </div>
    </AnimatedCard>
  )
}
