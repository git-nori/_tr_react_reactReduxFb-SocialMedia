import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setErrors, clearErrors, loadingUi, stopLoadingUi } from '../uiSlice'

const initialState = {
  screams: [],
  scream: {},
}

const screamSlice = createSlice({
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
    },
    submitComment(state, action) {
      state.scream.comments.push(action.payload)
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

export const getScream = (screamId) => dispatch => {
  dispatch(loadingUi())
  axios.get(`/scream/${screamId}`)
  .then(res => {
    dispatch(setScream(res.data))
    dispatch(stopLoadingUi())
  })
  .catch(err => {
    console.log(err)
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
  axios.post(`/scream/${screamId}/like`)
    .then(res => {
      dispatch(setLikeUnlikeScream(res.data))
    })
    .catch(err => {
      console.error(err)
    })
}

export const unlikeScream = screamId => dispatch => {
  axios.post(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch(setLikeUnlikeScream(res.data))
    })
    .catch(err => {
      console.error(err)
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

// screamにコメントを追加する
export const thunkSubmitComment = (screamId, commentData) => dispatch => {
  axios.post(`/scream/${screamId}/comments`, commentData)
  .then(res => {
    dispatch(submitComment(res.data))
    dispatch(clearErrors())
  })
  .catch(err => {
    console.log(err)
    dispatch(setErrors(err.response.data))
  })
}

export const {
  setScreams,
  setLikeUnlikeScream,
  setScreamsByDelete,
  postScream,
  setScream,
  submitComment
} = screamSlice.actions

export default screamSlice.reducer