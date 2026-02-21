import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface TerminalLine {
  type: 'input' | 'output'
  text: string
  i18nKey?: string
}

interface TerminalState {
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  history: TerminalLine[]
  currentInput: string
  commandHistory: string[]
  historyIndex: number
  pickerMode: 'resume' | null
}

const initialState: TerminalState = {
  isOpen: false,
  isMinimized: false,
  isMaximized: false,
  history: [
    {
      type: 'output',
      text: '',
      i18nKey: 'terminal:welcome',
    },
  ],
  currentInput: '',
  commandHistory: [],
  historyIndex: -1,
  pickerMode: null,
}

const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    toggleTerminal(state) {
      state.isOpen = !state.isOpen
      state.isMinimized = false
    },
    openTerminal(state) {
      state.isOpen = true
      state.isMinimized = false
    },
    closeTerminal(state) {
      state.isOpen = false
      state.isMinimized = false
      state.isMaximized = false
    },
    minimizeTerminal(state) {
      state.isMinimized = true
    },
    restoreTerminal(state) {
      state.isMinimized = false
    },
    toggleMaximize(state) {
      state.isMaximized = !state.isMaximized
    },
    setInput(state, action: PayloadAction<string>) {
      state.currentInput = action.payload
    },
    addLine(state, action: PayloadAction<TerminalLine>) {
      state.history.push(action.payload)
    },
    submitCommand(state) {
      const cmd = state.currentInput.trim()
      if (!cmd) return
      state.history.push({ type: 'input', text: `> ${cmd}` })
      state.commandHistory.push(cmd)
      state.historyIndex = -1
      state.currentInput = ''
    },
    clearHistory(state) {
      state.history = [
        {
          type: 'output',
          text: '',
          i18nKey: 'terminal:cleared',
        },
      ]
    },
    setPickerMode(state, action: PayloadAction<'resume' | null>) {
      state.pickerMode = action.payload
    },
    navigateHistory(state, action: PayloadAction<'up' | 'down'>) {
      if (state.commandHistory.length === 0) return
      if (action.payload === 'up') {
        const newIndex =
          state.historyIndex === -1
            ? state.commandHistory.length - 1
            : Math.max(0, state.historyIndex - 1)
        state.historyIndex = newIndex
        state.currentInput = state.commandHistory[newIndex]
      } else {
        if (state.historyIndex === -1) return
        const newIndex = state.historyIndex + 1
        if (newIndex >= state.commandHistory.length) {
          state.historyIndex = -1
          state.currentInput = ''
        } else {
          state.historyIndex = newIndex
          state.currentInput = state.commandHistory[newIndex]
        }
      }
    },
  },
})

export const {
  toggleTerminal,
  openTerminal,
  closeTerminal,
  minimizeTerminal,
  restoreTerminal,
  toggleMaximize,
  setInput,
  addLine,
  submitCommand,
  clearHistory,
  setPickerMode,
  navigateHistory,
} = terminalSlice.actions
export default terminalSlice.reducer
