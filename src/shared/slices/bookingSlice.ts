import { createSlice } from '@reduxjs/toolkit'

interface BookingState {
  isOpen: boolean
}

const initialState: BookingState = {
  isOpen: false,
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    openBooking(state) {
      state.isOpen = true
    },
    closeBooking(state) {
      state.isOpen = false
    },
  },
})

export const { openBooking, closeBooking } = bookingSlice.actions
export default bookingSlice.reducer
