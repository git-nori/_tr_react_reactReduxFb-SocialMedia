import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, logoutUser, editUserDetails, likeScream as setLikesByLike, unlikeScream as setLikesByUnlike } from '../auth/userSlice'
import { getScreams, likeScream, unlikeScream, deleteScream } from '../dataSlice'

import ScreamCards from './ScreamCards'
import Profile from './Profile'

import { Container, Grid } from '@material-ui/core'

const HomePage = () => {
  const user = useSelector(state => state.user)
  const screams = useSelector(state => state.data.screams)
  const loading = useSelector(state => state.ui.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getScreams())
  }, [])

  const hdlDelScream = (screamId) => {
    dispatch(deleteScream(screamId))
  }

  const hdlLikeScream = (screamId) => {
    dispatch(likeScream(screamId))
    dispatch(setLikesByLike(screamId))
  }

  const hdlUnlikeScream = (screamId) => {
    dispatch(unlikeScream(screamId))
    dispatch(setLikesByUnlike(screamId))
  }

  const renderRecentScreamsMarkup = () => {
    return loading
      ? <p>...loading</p>
      : <ScreamCards
        user={user}
        screams={screams}
        likeScream={hdlLikeScream}
        unlikeScream={hdlUnlikeScream}
        deleteScream={hdlDelScream} />
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>{renderRecentScreamsMarkup()}</Grid>
        <Grid item xs={12} sm={4}>
          <Profile
            logout={() => { dispatch(logoutUser()) }}
            uploadImage={(formData) => { dispatch(uploadImage(formData)) }}
            editUserDetails={(userDetails) => { dispatch(editUserDetails(userDetails)) }}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomePage