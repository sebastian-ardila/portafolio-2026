import { configureStore } from '@reduxjs/toolkit'
import skillsReducer from '@/features/skills/slices/skillsSlice'
import projectsReducer from '@/features/projects/slices/projectsSlice'
import blogReducer from '@/features/blog/slices/blogSlice'
import terminalReducer from '@/features/terminal/slices/terminalSlice'
import bookingReducer from '@/shared/slices/bookingSlice'

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
    projects: projectsReducer,
    blog: blogReducer,
    terminal: terminalReducer,
    booking: bookingReducer,
  },
})
