import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  errors: null,
  loading: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setErrors (state, action) {
      state.loading = false
      state.errors = action.payload
    },
    clearErrors (state, action) {
      state.loading = false
      state.errors = null
    },
    loadingUi (state, action) {
      state.loading = true
    },
    stopLoadingUi(state,action){
      state.loading = false
    }
  }
})

export const {
  setErrors,
  clearErrors,
  loadingUi,
  stopLoadingUi
} = uiSlice.actions

export default uiSlice.reducer