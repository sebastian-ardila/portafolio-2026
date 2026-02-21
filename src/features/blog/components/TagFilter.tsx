import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setActiveTag, selectAllTags } from '../slices/blogSlice'
import { cn } from '@/shared/utils/cn'

export function TagFilter() {
  const dispatch = useAppDispatch()
  const allTags = useAppSelector(selectAllTags)
  const activeTag = useAppSelector((s) => s.blog.activeTag)
  const { t } = useTranslation('blog')

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => dispatch(setActiveTag(null))}
        className={cn(
          'rounded-full px-3 py-1 text-xs font-medium transition-all',
          !activeTag
            ? 'bg-purple/20 text-purple'
            : 'text-foreground/50 hover:text-foreground/80'
        )}
      >
        {t('all')}
      </button>
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => dispatch(setActiveTag(tag === activeTag ? null : tag))}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium transition-all',
            activeTag === tag
              ? 'bg-purple/20 text-purple'
              : 'text-foreground/50 hover:text-foreground/80'
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
