import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { userId: null, userName: null, userRate: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { _id, firstName, rate, accessToken } = action.payload
      state.userId = _id
      state.userName = firstName
      state.userRate = rate
      state.token = accessToken
    },
    logOut: (state, action) => {
      state.userId = null
      state.userName = null
      state.userRate = null
      state.token = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentId = (state) => state.auth.userId
export const selectCurrentUser = (state) => state.auth.userName
export const selectCurrentToken = (state) => state.auth.token
