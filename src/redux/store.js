import { configureStore } from '@reduxjs/toolkit'
import { ProfileReducers, userReducers } from './reducers/userReducer'
import { courseReducer } from './reducers/courseReducers'

export const serverUrl="http://localhost:5000/api/v1"
export const store = configureStore({
  reducer: {
    user:userReducers,
    profile:ProfileReducers,
    course:courseReducer
  },
})