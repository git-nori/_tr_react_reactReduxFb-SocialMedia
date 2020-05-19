import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { likeScream as setLikesByLike, unlikeScream as setLikesByUnlike } from '../userSlice'
import { getUserData, getScream, deleteScream, likeScream, unlikeScream, thunkSubmitComment } from '../../scream/screamSlice'
import { clearErrors } from '../../uiSlice'

import StaticProfile from '../../profile/StaticProfile'
import Scream from '../../scream/Scream'
import { Grid, Container } from '@material-ui/core'

const UserPage = () => {
  const dispatch = useDispatch()
  const { screams, scream } = useSelector(state => state.data)
  const isAuthenticated = useSelector(state => state.user.authenticated)
  const ui = useSelector(state => state.ui)
  const { handle } = useParams()
  const [profile, setProfile] = useState('')

  useEffect(() => {
    // screamを取得
    dispatch(getUserData(handle))
    // user情報を取得
    axios.get(`/user/${handle}`)
      .then(res => {
        setProfile(res.data.user)
      })
      .catch(err => console.log(err))
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

  const hdlGetScream = (screamId) => {
    dispatch(getScream(screamId))
  }

  const hdlSubmitComment = (screamId, data) => {
    dispatch(thunkSubmitComment(screamId, data))
  }

  const hdlClearErrors = () => {
    dispatch(clearErrors())
  }

  const screenMarkup = () => {
    // 初期表示時
    if (ui.loading && screams.length < 1) {
      return <p>...loading</p>
    }

    const comments = scream.comments
    return screams === null
      ? (
        <p>No screams from this user</p>
      )
      : (
        screams.map((scream) => {
          return <Scream 
          key={scream.screamId} 
          scream={scream} 
          authenticated={isAuthenticated} 
          comments={comments}
          likeScream={hdlLikeScream}
          unlikeScream={hdlUnlikeScream}
          deleteScream={hdlDelScream}
          getScream={hdlGetScream}
          submitComment={hdlSubmitComment}
          clearErrors={hdlClearErrors}
          errors={ui.errors}
          loading={ui.loading} />
          })
      )
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>{screenMarkup()}</Grid>
        <Grid item xs={12} sm={4}>
          <StaticProfile {...profile} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default UserPage