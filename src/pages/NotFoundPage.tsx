import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GlowButton } from '@/shared/components/GlowButton'

export function NotFoundPage() {
  const { t } = useTranslation('common')

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="mb-4 bg-gradient-to-r from-cyan to-purple bg-clip-text text-8xl font-bold text-transparent">
          {t('notFound.title')}
        </h1>
        <p className="mb-2 text-xl font-semibold">{t('notFound.heading')}</p>
        <p className="mb-8 text-foreground/50">
          {t('notFound.description')}
        </p>
        <Link to="/">
          <GlowButton variant="primary">{t('notFound.backHome')}</GlowButton>
        </Link>
      </motion.div>
    </div>
  )
}
