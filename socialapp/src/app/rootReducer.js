import { combineReducers } from '@reduxjs/toolkit'

import userReducer from '../features/user/userSlice'
import uiReducer from '../features/uiSlice'
import dataReducer from '../features/scream/screamSlice'

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  data: dataReducer
})

export default rootReducer