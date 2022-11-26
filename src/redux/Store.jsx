import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './UserLoggedInSliceReducer'

/* ➡ Configurando el store de redux y asignandole su respectivo reducer. */
export const store = configureStore({
  reducer: {
    userLoggedIn: UserReducer
  }
})
