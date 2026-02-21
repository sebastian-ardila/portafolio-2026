import type { IRepository } from '@/core/interfaces/IRepository'
import type { IPost, IPostMeta } from '@/app/types'

const postFiles = import.meta.glob<string>('/content/posts/**/*.md', {
  query: '?raw',
  import: 'default',
})

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {} as Record<string, unknown>, content: raw }

  const frontmatter = match[1]
  const content = match[2]
  const data: Record<string, unknown> = {}

  for (const line of frontmatter.split('\n')) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue
    const key = line.slice(0, colonIndex).trim()
    let value: unknown = line.slice(colonIndex + 1).trim()

    // Remove quotes
    if (
      typeof value === 'string' &&
      value.startsWith('"') &&
      value.endsWith('"')
    ) {
      value = value.slice(1, -1)
    }

    // Parse arrays like ["a", "b"]
    if (typeof value === 'string' && value.startsWith('[')) {
      try {
        value = JSON.parse(value)
      } catch {
        // keep as string
      }
    }

    // Parse booleans
    if (value === 'true') value = true
    if (value === 'false') value = false

    data[key] = value
  }

  return { data, content }
}

function getLangFromPath(path: string): string {
  // path like /content/posts/en/file.md or /content/posts/es/file.md
  const parts = path.split('/')
  const postsIndex = parts.indexOf('posts')
  if (postsIndex >= 0 && postsIndex + 1 < parts.length) {
    const langCandidate = parts[postsIndex + 1]
    if (langCandidate === 'en' || langCandidate === 'es') {
      return langCandidate
    }
  }
  return 'en'
}

export class MarkdownRepository implements IRepository<IPost, IPostMeta> {
  private cache: Map<string, IPost> = new Map()

  async getAll(lang: string = 'en'): Promise<IPostMeta[]> {
    const posts: IPostMeta[] = []

    for (const [path, loader] of Object.entries(postFiles)) {
      if (getLangFromPath(path) !== lang) continue

      const raw = await loader()
      const { data } = parseFrontmatter(raw)
      const slug =
        (data.slug as string) ||
        path
          .split('/')
          .pop()!
          .replace(/\.md$/, '')

      posts.push({
        title: (data.title as string) ?? '',
        date: (data.date as string) ?? '',
        tags: (data.tags as string[]) ?? [],
        description: (data.description as string) ?? '',
        slug,
        published: data.published !== false,
      })
    }

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  async getById(slug: string, lang: string = 'en'): Promise<IPost | null> {
    const cacheKey = `${lang}:${slug}`
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey)!

    for (const [path, loader] of Object.entries(postFiles)) {
      if (getLangFromPath(path) !== lang) continue

      const fileName = path
        .split('/')
        .pop()!
        .replace(/\.md$/, '')

      const raw = await loader()
      const { data, content } = parseFrontmatter(raw)
      const postSlug = (data.slug as string) || fileName

      if (postSlug === slug) {
        const post: IPost = {
          title: (data.title as string) ?? '',
          date: (data.date as string) ?? '',
          tags: (data.tags as string[]) ?? [],
          description: (data.description as string) ?? '',
          slug: postSlug,
          published: data.published !== false,
          content,
        }
        this.cache.set(cacheKey, post)
        return post
      }
    }

    return null
  }
}
