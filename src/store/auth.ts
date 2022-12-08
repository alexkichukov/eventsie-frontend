import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: AuthUser | null
}

const initialState: AuthState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set JWT token and decode it
    setUser(state, action: PayloadAction<Partial<AuthUser> | null>) {
      if (!action.payload) {
        state.user = null
        return
      }

      // Delete undefined props if any
      for (const prop of Object.keys(action.payload) as (keyof AuthUser)[]) {
        if (action.payload[prop] === undefined) delete action.payload[prop]
      }

      state.user = {
        ...state.user,
        ...(action.payload as AuthUser)
      }
    }
  }
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
