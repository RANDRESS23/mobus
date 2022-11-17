import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './UserLoggedInSliceReducer'

export const store = configureStore({
  reducer: {
    userLoggedIn: UserReducer
  }
})
