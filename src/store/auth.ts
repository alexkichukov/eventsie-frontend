import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  token: string
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  favouriteEvents: string[]
  attendingEvents: string[]
}

interface AuthState {
  user: User | null
}

const initialState: AuthState = {
  user: null
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Set JWT token and decode it
    setUser(state, action: PayloadAction<Partial<User> | null>) {
      if (!action.payload) {
        state.user = null
        return
      }

      // Delete undefined props if any
      for (const prop of Object.keys(action.payload) as (keyof User)[]) {
        if (action.payload[prop] === undefined) delete action.payload[prop]
      }

      state.user = {
        ...state.user,
        ...(action.payload as User)
      }
    }
  }
})

export const { setUser } = counterSlice.actions

export default counterSlice.reducer
