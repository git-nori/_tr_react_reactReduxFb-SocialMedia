import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { getUserData, getScream } from '../../scream/screamSlice'

import StaticProfile from '../../profile/StaticProfile'
import Scream from '../../scream/Scream'
import { Grid, Container } from '@material-ui/core'

const UserPage = () => {
  const dispatch = useDispatch()
  const { screams } = useSelector(state => state.data)
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

  const screenMarkup = () => {
    if (ui.loading) {
      return <p>...loading</p>
    }

    return screams === null
      ? (
        <p>No screams from this user</p>
      )
      : (
        screams.map((scream) => {
          return <Scream scream={scream} key={scream.screamId} authenticated={isAuthenticated} />
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