import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchPostBySlug } from '../slices/blogSlice'

export function usePostBySlug(slug: string | undefined) {
  const dispatch = useAppDispatch()
  const post = useAppSelector((s) => (slug ? s.blog.fullPosts[slug] : null))
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'

  useEffect(() => {
    if (slug && !post) {
      dispatch(fetchPostBySlug({ slug, lang }))
    }
  }, [slug, post, dispatch, lang])

  return post
}
