import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IProject } from '@/app/types'
import { projects } from '@/config/projects'

interface ProjectsState {
  items: IProject[]
  activeTech: string | null
  selectedProjectId: string | null
}

const initialState: ProjectsState = {
  items: projects,
  activeTech: null,
  selectedProjectId: null,
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setActiveTech(state, action: PayloadAction<string | null>) {
      state.activeTech = action.payload
    },
    setSelectedProject(state, action: PayloadAction<string | null>) {
      state.selectedProjectId = action.payload
    },
  },
  selectors: {
    selectFilteredProjects(state) {
      if (!state.activeTech) return state.items
      return state.items.filter(p =>
        p.technologies.includes(state.activeTech!)
      )
    },
    selectSelectedProject(state) {
      if (!state.selectedProjectId) return null
      return state.items.find(p => p.id === state.selectedProjectId) ?? null
    },
    selectAllTechnologies(state) {
      const techs = new Set<string>()
      state.items.forEach(p => p.technologies.forEach(t => techs.add(t)))
      return Array.from(techs).sort()
    },
  },
})

export const { setActiveTech, setSelectedProject } = projectsSlice.actions
export const { selectFilteredProjects, selectSelectedProject, selectAllTechnologies } = projectsSlice.selectors
export default projectsSlice.reducer
