import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionWrapper } from '@/shared/components/SectionWrapper'
import { BlogPostCard } from './BlogPostCard'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchPosts, selectFilteredPosts } from '../slices/blogSlice'
import { SECTION_IDS } from '@/shared/utils/constants'
import { GlowButton } from '@/shared/components/GlowButton'

export function BlogSection() {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectFilteredPosts)
  const { t, i18n } = useTranslation('blog')
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'

  useEffect(() => {
    dispatch(fetchPosts(lang))
  }, [dispatch, lang])

  const previewPosts = posts.slice(0, 3)

  return (
    <SectionWrapper id={SECTION_IDS.BLOG}>
      <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-cyan">
        {t('sectionLabel')}
      </h2>
      <h3 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
        {t('heading')}
      </h3>

      <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {previewPosts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <BlogPostCard post={post} />
          </motion.div>
        ))}
      </div>

      {posts.length > 3 && (
        <div className="text-center">
          <Link to="/blog">
            <GlowButton variant="secondary">{t('viewAllPosts')}</GlowButton>
          </Link>
        </div>
      )}
    </SectionWrapper>
  )
}
