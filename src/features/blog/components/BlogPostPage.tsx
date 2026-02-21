import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import { MarkdownRenderer } from './MarkdownRenderer'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchPostBySlug } from '../slices/blogSlice'

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const dispatch = useAppDispatch()
  const post = useAppSelector((s) => (slug ? s.blog.fullPosts[slug] : null))
  const { t, i18n } = useTranslation('blog')
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'

  useEffect(() => {
    if (slug && !post) {
      dispatch(fetchPostBySlug({ slug, lang }))
    }
  }, [slug, post, dispatch, lang])

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-foreground/40">{t('loadingPost')}</div>
      </div>
    )
  }

  const readingTime = estimateReadingTime(post.content)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl px-4 pt-28 pb-20"
    >
      <Link
        to="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-cyan"
      >
        <HiArrowLeft /> {t('backToBlog')}
      </Link>

      <header className="mb-10">
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{post.title}</h1>
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-foreground/40">
            {post.date}
          </span>
          <span className="text-foreground/20">&middot;</span>
          <span className="font-mono text-sm text-foreground/40">
            {t('minRead', { count: readingTime })}
          </span>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-purple/10 px-2.5 py-0.5 text-xs text-purple transition-colors hover:bg-purple/20 hover:text-purple/90"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="mb-10 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

      <MarkdownRenderer content={post.content} />
    </motion.article>
  )
}
