import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { IPostMeta } from '@/app/types'
import { AnimatedCard } from '@/shared/components/AnimatedCard'

interface BlogPostCardProps {
  post: IPostMeta
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const readingTime = estimateReadingTime(post.description)
  const { t } = useTranslation('blog')

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link to={`/blog/${post.slug}`}>
        <AnimatedCard tilt={true} className="group relative flex h-full flex-col">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/0 to-transparent transition-all duration-300 group-hover:via-cyan/40" />

          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-xs text-cyan/60">{post.date}</span>
            <span className="text-foreground/20">&middot;</span>
            <span className="font-mono text-xs text-foreground/40">
              {t('minRead', { count: readingTime })}
            </span>
          </div>

          <h4 className="mb-2 text-lg font-bold transition-colors group-hover:text-cyan">
            {post.title}
          </h4>

          <p className="mb-4 text-sm text-foreground/50">{post.description}</p>

          <div className="mt-auto flex items-end justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-purple/10 px-2.5 py-0.5 text-xs text-purple transition-colors duration-300 group-hover:bg-purple/20 group-hover:text-purple/90"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="shrink-0 text-xs text-foreground/30 transition-colors group-hover:text-cyan">
              {t('readMore')} &rarr;
            </span>
          </div>
        </AnimatedCard>
      </Link>
    </motion.div>
  )
}
