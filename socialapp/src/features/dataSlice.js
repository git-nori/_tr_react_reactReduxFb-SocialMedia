import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setErrors, clearErrors, loadingUi, stopLoadingUi } from './uiSlice'

const initialState = {
  screams: [],
  scream: {},
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setScreams (state, action) {
      state.screams = action.payload
    },
    setScream (state, action) {
      state.scream = action.payload
    },
    setLikeUnlikeScream (state, action) {
      let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId)
      state.screams[index] = action.payload
    },
    setScreamsByDelete (state, action) {
      state.screams = state.screams.filter(scream => scream.screamId !== action.payload)
    },
    postScream (state, action) {
      state.screams.unshift(action.payload)
    }
  }
})

// Get all screams
export const getScreams = () => dispatch => {
  dispatch(loadingUi())
  axios.get('/screams')
    .then(res => {
      dispatch(setScreams(res.data))
      dispatch(stopLoadingUi())
    })
    .catch(err => {
      dispatch(setScreams([]))
      dispatch(stopLoadingUi())
    })
}


export const asyncPostScream = (newScream) => dispatch => {
  dispatch(loadingUi())
  axios.post('/scream', newScream)
    .then(res => {
      dispatch(postScream(res.data))
      dispatch(clearErrors())
      dispatch(stopLoadingUi())
    })
    .catch(err => {
      dispatch(setErrors(err.response.data))
      dispatch(stopLoadingUi())
    })
}

export const likeScream = screamId => dispatch => {
  dispatch(loadingUi())
  axios.post(`/scream/${screamId}/like`)
    .then(res => {
      dispatch(setLikeUnlikeScream(res.data))
      dispatch(stopLoadingUi())
    })
    .catch(err => {
      console.error(err)
      dispatch(stopLoadingUi())
    })
}

export const unlikeScream = screamId => dispatch => {
  dispatch(loadingUi())
  axios.post(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch(setLikeUnlikeScream(res.data))
      dispatch(stopLoadingUi())
    })
    .catch(err => {
      console.error(err)
      dispatch(stopLoadingUi())
    })
}

export const deleteScream = screamId => dispatch => {
  dispatch(loadingUi())
  axios.delete(`/scream/${screamId}`)
    .then(() => {
      dispatch(setScreamsByDelete(screamId))
      dispatch(stopLoadingUi())
    })
    .catch(err => {
      console.error(err)
      dispatch(stopLoadingUi())
    })
}

export const {
  setScreams,
  setLikeUnlikeScream,
  setScreamsByDelete,
  postScream,
  setScream
} = dataSlice.actions

export default dataSlice.reducer