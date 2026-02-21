import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { BlogPostCard } from './BlogPostCard'
import { TagFilter } from './TagFilter'
import { SearchBar } from './SearchBar'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchPosts, selectFilteredPosts } from '../slices/blogSlice'

export function BlogListPage() {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectFilteredPosts)
  const loading = useAppSelector((s) => s.blog.loading)
  const { t, i18n } = useTranslation('blog')
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'

  useEffect(() => {
    dispatch(fetchPosts(lang))
  }, [dispatch, lang])

  return (
    <div className="mx-auto max-w-4xl px-4 pt-28 pb-20">
      <h1 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-cyan">
        {t('sectionLabel')}
      </h1>
      <h2 className="mb-10 text-center text-3xl font-bold sm:text-4xl">
        {t('allPosts')}
      </h2>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TagFilter />
        <div className="w-full sm:w-64">
          <SearchBar />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-foreground/40">{t('loading')}</div>
      ) : posts.length === 0 ? (
        <div className="py-20 text-center text-foreground/40">
          {t('noPosts')}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <BlogPostCard post={post} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
