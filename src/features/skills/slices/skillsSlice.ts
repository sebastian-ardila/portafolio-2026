import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ISkill, SkillCategory } from '@/app/types'
import { skills } from '@/config/skills'

interface SkillsState {
  items: ISkill[]
  activeCategory: SkillCategory | 'all'
}

const initialState: SkillsState = {
  items: skills,
  activeCategory: 'all',
}

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<SkillCategory | 'all'>) {
      state.activeCategory = action.payload
    },
  },
  selectors: {
    selectFilteredSkills(state) {
      const filtered = state.activeCategory === 'all'
        ? state.items
        : state.items.filter(s => s.category === state.activeCategory)

      return [...filtered].sort((a, b) => b.years - a.years)
    },
    selectActiveCategory(state) {
      return state.activeCategory
    },
  },
})

export const { setActiveCategory } = skillsSlice.actions
export const { selectFilteredSkills, selectActiveCategory } = skillsSlice.selectors
export default skillsSlice.reducer
