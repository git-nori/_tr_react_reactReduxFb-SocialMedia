import { combineReducers } from '@reduxjs/toolkit'

import userReducer from '../features/auth/userSlice'
import uiReducer from '../features/uiSlice'
import dataReducer from '../features/dataSlice'

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  data: dataReducer
})

export default rootReducer