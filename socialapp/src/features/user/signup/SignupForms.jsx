import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { makeStyles, Typography, FormControl, TextField, Button, Box, CircularProgress } from '@material-ui/core'

const SignupForms = ({ signupUser }) => {
  const classes = useStyles()

  const history = useHistory()
  const dispatch = useDispatch()

  const loading = useSelector(state => state.ui.loading)
  const uiErrors = useSelector(state => state.ui.errors)

  const [handle, setHandle] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if(uiErrors){
      setErrors(uiErrors)
    }
  }, [uiErrors])

  const hdlOnChange = (e) => {
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value)
        break;
      case "password":
        setPassword(e.target.value)
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value)
        break;
      case "handle":
        setHandle(e.target.value)
        break;
      default:
        break;
    }
  }

  const hdlOnSubmit = () => {
    const userData = {
      email,
      password,
      confirmPassword,
      handle
    }
    dispatch(signupUser(userData, history))
  }

  const renderAlert = () => {
    return errors.general !== "undefined" ?
      "" : <Typography variant="body2" color="error">{errors.general}</Typography>
  }

  const renderLoading = () => {
    if (loading) {
      return (
        <Box textAlign="center" mt={3}><CircularProgress /></Box>
      )
    }
  }

  return (
    <>
      <Typography variant="h2">Signup</Typography>
      {renderAlert()}
      <FormControl fullWidth>
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          value={email}
          helperText={errors.email}
          error={errors.email ? true : false}
          onChange={hdlOnChange}
          className={classes.inputForm} />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          value={password}
          helperText={errors.password}
          error={errors.password ? true : false}
          onChange={hdlOnChange}
          className={classes.inputForm} />
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="confirmPassword"
          value={confirmPassword}
          helperText={errors.password}
          error={errors.password ? true : false}
          onChange={hdlOnChange}
          className={classes.inputForm} />
        <TextField
          id="handle"
          name="handle"
          type="text"
          label="handle"
          value={handle}
          helperText={errors.handle}
          error={errors.handle ? true : false}
          onChange={hdlOnChange}
          className={classes.inputForm} />

        {renderLoading()}
        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={hdlOnSubmit} disabled={loading}>
            Signup
          </Button>
        </Box>
        <Box mt={3}>
          <small>have an account ? login <Link to="/login">here</Link></small>
        </Box>
      </FormControl>
    </>
  )
}

const useStyles = makeStyles({
  inputForm: {
    marginTop: "1rem"
  },
})

export default SignupForms