import React from 'react'
import { loginUser } from '../userSlice'

import LoginForms from './LoginForms'

import { Container, Grid, makeStyles } from '@material-ui/core'

const LoginPage = () => {
  const classes = useStyles()
  return (
    <Container>
      <Grid container className={classes.root}>
        <Grid item sm></Grid>
        <Grid item sm>
          <LoginForms loginUser={loginUser} />
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    </Container>
  )
}

const useStyles = makeStyles({
  root: {
    textAlign: "center"
  }
})

export default LoginPage