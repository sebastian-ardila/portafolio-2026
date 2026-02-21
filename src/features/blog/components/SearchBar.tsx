import { HiSearch } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setSearchQuery } from '../slices/blogSlice'

export function SearchBar() {
  const dispatch = useAppDispatch()
  const query = useAppSelector((s) => s.blog.searchQuery)
  const { t } = useTranslation('blog')

  return (
    <div className="relative">
      <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
      <input
        type="text"
        placeholder={t('searchPlaceholder')}
        value={query}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="w-full rounded-lg border border-card-border bg-card py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground/30 focus:border-cyan/30 focus:outline-none"
      />
    </div>
  )
}
