import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Category {
  id: string
  name: string
}

interface EventsState {
  categories: Category[]
}

const initialState: EventsState = {
  categories: []
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload
    }
  }
})

export const { setCategories } = eventsSlice.actions

export default eventsSlice.reducer
