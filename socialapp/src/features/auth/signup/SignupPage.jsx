import React from 'react'

import SignupForms from './SignupForms'

import { Container, Grid, makeStyles } from '@material-ui/core'

const SignupPage = () => {
  const classes = useStyles()
  return (
    <Container>
      <Grid container className={classes.root}>
        <Grid item sm></Grid>
        <Grid item sm>
          <SignupForms />
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

export default SignupPage