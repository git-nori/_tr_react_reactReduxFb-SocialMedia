import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  screams: [],
  scream: {},
  loading: false
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    loadingData (state, action) {
      state.loading = true
    },
    setScreams (state, action) {
      state.screams = action.payload
      state.loading = false
    },
    setLikeUnlikeScream (state, action) {
      let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId)
      state.screams[index] = action.payload
      state.loading = false
    },
    setScreamsByDelete (state, action) {
      state.screams = state.screams.filter(scream => scream.screamId !== action.payload)
    }
  }
})

// Get all screams
export const getScreams = () => dispatch => {
  dispatch(loadingData())
  axios.get('/screams')
    .then(res => {
      dispatch(setScreams(res.data))
    })
    .catch(err => {
      dispatch(setScreams([]))
    })
}

export const likeScream = screamId => dispatch => {
  dispatch(loadingData())
  axios.post(`/scream/${screamId}/like`)
    .then(res => {
      dispatch(setLikeUnlikeScream(res.data))
    })
    .catch(err => console.error(err))
}

export const unlikeScream = screamId => dispatch => {
  dispatch(loadingData())
  axios.post(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch(setLikeUnlikeScream(res.data))
    })
    .catch(err => console.error(err))
}

export const deleteScream = screamId => dispatch => {
  console.log(`/scream/${screamId}`)
  axios.delete(`/scream/${screamId}`)
    .then(() => {
      dispatch(setScreamsByDelete(screamId))
    })
    .catch(err => console.log(err))
}

export const {
  loadingData,
  setScreams,
  setLikeUnlikeScream,
  setScreamsByDelete
} = dataSlice.actions

export default dataSlice.reducer