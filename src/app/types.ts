import type { store } from './store'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export interface IPostMeta {
  title: string
  date: string
  tags: string[]
  description: string
  slug: string
  published: boolean
}

export interface IPost extends IPostMeta {
  content: string
}

export interface ISkill {
  name: string
  category: SkillCategory
  icon: string
  years: number
  isCore: boolean
  usedAt: string[]
  description: string
}

export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'design'

export interface IExperience {
  id: string
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
  current?: boolean
}

export interface IProject {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  image: string
  liveUrl?: string
  repoUrl?: string
  featured: boolean
}

export interface IAchievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
}

export interface IProfile {
  name: string
  role: string
  bio: string
  location: string
  avatarUrl: string
  resumeUrl: string
  resumeUrlEs: string
  social: {
    github: string
    linkedin: string
    twitter: string
  }
  stats: {
    yearsExperience: number
    projectsCompleted: number
    technologiesMastered: number
    coffeeConsumed: number
  }
}
