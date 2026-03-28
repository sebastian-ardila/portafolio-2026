import { Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  HiHome, HiUser, HiBriefcase, HiCode, HiBookOpen,
  HiHeart, HiDocumentText, HiChevronRight,
} from 'react-icons/hi'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectActiveCategory,
  setActiveCategory,
} from '@/features/skills/slices/skillsSlice'
import { cn } from '@/shared/utils/cn'
import type { IconType } from 'react-icons'
import type { SkillCategory } from '@/app/types'

interface Crumb {
  label: string
  path: string
  icon: IconType
}

const ROUTE_ICONS: Record<string, IconType> = {
  about: HiUser,
  experience: HiBriefcase,
  skills: HiCode,
  blog: HiBookOpen,
  'my-life': HiHeart,
}

const categoryKeys: { key: string; value: SkillCategory | 'all' }[] = [
  { key: 'all', value: 'all' },
  { key: 'frontend', value: 'frontend' },
  { key: 'backend', value: 'backend' },
  { key: 'tools', value: 'tools' },
  { key: 'design', value: 'design' },
  { key: 'leadership', value: 'leadership' },
]

export function Breadcrumb() {
  const location = useLocation()
  const params = useParams<{ slug?: string }>()
  const { t } = useTranslation('common')
  const { t: ts } = useTranslation('skills')
  const dispatch = useAppDispatch()
  const activeCategory = useAppSelector(selectActiveCategory)

  const segments = location.pathname.split('/').filter(Boolean)
  const isSkillsPage = location.pathname === '/skills'

  if (segments.length === 0) return null

  const crumbs: Crumb[] = [
    { label: t('nav.home'), path: '/', icon: HiHome },
  ]

  let currentPath = ''
  for (const segment of segments) {
    currentPath += `/${segment}`

    if (segment === params.slug) {
      crumbs.push({
        label: decodeURIComponent(segment).replace(/-/g, ' '),
        path: currentPath,
        icon: HiDocumentText,
      })
    } else {
      const navKey = segment as keyof typeof ROUTE_ICONS
      crumbs.push({
        label: t(`nav.${segment}`, { defaultValue: segment }),
        path: currentPath,
        icon: ROUTE_ICONS[navKey] || HiDocumentText,
      })
    }
  }

  return (
    <nav className="sticky top-[64px] z-30 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:px-6">
        <div className="flex shrink-0 items-center gap-1">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1
            const Icon = crumb.icon
            return (
              <span key={crumb.path} className="flex items-center gap-1">
                {i > 0 && <HiChevronRight className="text-xs text-foreground/20" />}
                {isLast ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-foreground/60">
                    <Icon size={12} className="text-cyan/60" />
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="flex items-center gap-1 text-xs text-foreground/40 transition-colors hover:text-cyan"
                  >
                    <Icon size={12} />
                    {crumb.label}
                  </Link>
                )}
              </span>
            )
          })}
        </div>

        {isSkillsPage && (
          <div className="flex items-center gap-1 overflow-x-auto">
            {categoryKeys.map((cat) => (
              <button
                key={cat.value}
                onClick={() => dispatch(setActiveCategory(cat.value))}
                className={cn(
                  'whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium transition-all sm:px-3 sm:text-xs',
                  activeCategory === cat.value
                    ? 'bg-cyan/20 text-cyan'
                    : 'text-foreground/40 hover:text-foreground/70'
                )}
              >
                {ts(`categories.${cat.key}`)}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
