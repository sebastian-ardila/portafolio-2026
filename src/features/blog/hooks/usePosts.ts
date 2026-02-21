import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchPosts, selectFilteredPosts } from '../slices/blogSlice'

export function usePosts() {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectFilteredPosts)
  const loading = useAppSelector((s) => s.blog.loading)
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('es') ? 'es' : 'en'

  useEffect(() => {
    dispatch(fetchPosts(lang))
  }, [dispatch, lang])

  return { posts, loading }
}
