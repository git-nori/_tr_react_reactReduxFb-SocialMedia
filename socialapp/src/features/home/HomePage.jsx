import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ScreamCards from './ScreamCards'
import Profile from './Profile'

import { Container, Grid } from '@material-ui/core'

const HomePage = () => {
  const [screams, setScreams] = useState(null)

  useEffect(() => {
    axios.get('/screams')
      .then(res => {
        setScreams(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const renderRecentScreamsMarkup = () => {
    return !screams ?
      <p>...loading</p> : <ScreamCards screams={screams} />
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>{renderRecentScreamsMarkup()}</Grid>
        <Grid item xs={12} sm={4}><Profile /></Grid>
      </Grid>
    </Container>
  )
}

export default HomePage