import { configureStore } from '@reduxjs/toolkit'
import { ProfileReducers, userReducers } from './reducers/userReducer'
<<<<<<< HEAD
import { courseReducer } from './reducers/courseReducers'
=======
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f

export const serverUrl="http://localhost:5000/api/v1"
export const store = configureStore({
  reducer: {
    user:userReducers,
<<<<<<< HEAD
    profile:ProfileReducers,
    course:courseReducer
=======
    profile:ProfileReducers
>>>>>>> 30056cbaf66c72095fe31022d0c6598f27b3d52f
  },
})