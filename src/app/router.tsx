import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout } from '@/shared/components/Layout'

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage }))
)
const BlogListPage = lazy(() =>
  import('@/features/blog/components/BlogListPage').then((m) => ({
    default: m.BlogListPage,
  }))
)
const BlogPostPage = lazy(() =>
  import('@/features/blog/components/BlogPostPage').then((m) => ({
    default: m.BlogPostPage,
  }))
)
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
)
const ExperiencePage = lazy(() =>
  import('@/pages/ExperiencePage').then((m) => ({ default: m.ExperiencePage }))
)
const MyLifePage = lazy(() =>
  import('@/pages/MyLifePage').then((m) => ({ default: m.MyLifePage }))
)
const SkillsPage = lazy(() =>
  import('@/pages/SkillsPage').then((m) => ({ default: m.SkillsPage }))
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
)

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan border-t-transparent" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

const basename = import.meta.env.BASE_URL

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'about',
        element: (
          <SuspenseWrapper>
            <AboutPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'experience',
        element: (
          <SuspenseWrapper>
            <ExperiencePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'skills',
        element: (
          <SuspenseWrapper>
            <SkillsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'my-life',
        element: (
          <SuspenseWrapper>
            <MyLifePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'blog',
        element: (
          <SuspenseWrapper>
            <BlogListPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'blog/:slug',
        element: (
          <SuspenseWrapper>
            <BlogPostPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '*',
        element: (
          <SuspenseWrapper>
            <NotFoundPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
], { basename })
