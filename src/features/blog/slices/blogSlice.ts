import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { IPostMeta, IPost } from '@/app/types'
import { MarkdownRepository } from '@/core/repositories/MarkdownRepository'

interface BlogState {
  posts: IPostMeta[]
  fullPosts: Record<string, IPost>
  activeTag: string | null
  searchQuery: string
  loading: boolean
  lang: string
}

const initialState: BlogState = {
  posts: [],
  fullPosts: {},
  activeTag: null,
  searchQuery: '',
  loading: false,
  lang: 'en',
}

const repo = new MarkdownRepository()

export const fetchPosts = createAsyncThunk(
  'blog/fetchPosts',
  async (lang: string | undefined, { getState }) => {
    const state = getState() as { blog: BlogState }
    const language = lang ?? state.blog.lang
    return repo.getAll(language)
  }
)

export const fetchPostBySlug = createAsyncThunk(
  'blog/fetchPostBySlug',
  async ({ slug, lang }: { slug: string; lang?: string }, { getState }) => {
    const state = getState() as { blog: BlogState }
    const language = lang ?? state.blog.lang
    return repo.getById(slug, language)
  }
)

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setActiveTag(state, action: PayloadAction<string | null>) {
      state.activeTag = action.payload
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
    setBlogLang(state, action: PayloadAction<string>) {
      state.lang = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload
        state.loading = false
      })
      .addCase(fetchPostBySlug.fulfilled, (state, action) => {
        if (action.payload) {
          state.fullPosts[action.payload.slug] = action.payload
        }
      })
  },
  selectors: {
    selectFilteredPosts(state) {
      let filtered = state.posts.filter(p => p.published)

      if (state.activeTag) {
        filtered = filtered.filter(p => p.tags.includes(state.activeTag!))
      }

      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase()
        filtered = filtered.filter(
          p =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        )
      }

      return filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    },
    selectAllTags(state) {
      const tags = new Set<string>()
      state.posts.forEach(p => p.tags.forEach(t => tags.add(t)))
      return Array.from(tags).sort()
    },
  },
})

export const { setActiveTag, setSearchQuery, setBlogLang } = blogSlice.actions
export const { selectFilteredPosts, selectAllTags } = blogSlice.selectors
export default blogSlice.reducer
