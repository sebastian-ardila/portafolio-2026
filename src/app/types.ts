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

export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'design' | 'leadership'

export interface IParallelProject {
  name: string
  role: string
  description: string
  technologies: string[]
  url?: string
  period?: string
}

export interface IExperience {
  id: string
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
  current?: boolean
  companyUrl?: string
  parallel?: IParallelProject[]
}

export interface IProjectLink {
  label: string
  url: string
}

export type ProjectType = 'work' | 'personal' | 'collaboration'

export interface IProject {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  image: string
  icon?: string
  liveUrls?: IProjectLink[]
  repoUrl?: string
  featured: boolean
  type: ProjectType
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
