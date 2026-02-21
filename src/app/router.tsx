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
])
