import { createSlice } from '@reduxjs/toolkit'

import { setErrors, clearErrors, loadingUi } from '../uiSlice'

import axios from 'axios'

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticated (state, action) {
      state.authenticated = true
    },
    setUnAuthenticated (state, action) {
      state.authenticated = false
    },
    setUser (state, action) {
      state.authenticated = true
      // state = action.payload
    },
  },
})

export const {
  setUser,
} = userSlice.actions

export default userSlice.reducer

/** thunk actions */
// ログイン処理
export const loginUser = (userData, history) => dispatch => {
  dispatch(loadingUi())

  axios.post('/login', userData)
    .then(res => {
      console.log(res.data)

      // localStorageにTokenを保存, axiosのデフォルトヘッダにセット
      const FBIdToken = `Bearer ${res.data.token}`
      localStorage.setItem('FBIdToken', FBIdToken)
      axios.defaults.headers.common['Authorization'] = FBIdToken

      dispatch(getUserData())
      dispatch(clearErrors())

      history.push('/')
    })
    .catch(err => {
      console.error(err)
      dispatch(setErrors(err.response.data))
    })
}

// ユーザー情報を取得
export const getUserData = () => dispatch => {
  axios.get('/user')
    .then(res => {
      dispatch(setUser(res.data))
    })
    .catch(err => console.error(err))
}
