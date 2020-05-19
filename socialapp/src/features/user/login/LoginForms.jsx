import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles, Typography, FormControl, TextField, Button, Box, CircularProgress } from '@material-ui/core'

const LoginForms = ({ loginUser }) => {
  const classes = useStyles()

  const history = useHistory()

  const dispatch = useDispatch()
  const loading = useSelector(state => state.ui.loading)
  const uiErrors = useSelector(state => state.ui.errors)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if(uiErrors) {
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
      default:
        break;
    }
  }

  const hdlOnSubmit = () => {
    const userData = {
      email,
      password
    }
    dispatch(loginUser(userData, history))
  }

  const renderAlert = () => {
    return errors.general === "undefined" ?
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
      <Typography variant="h2">Login</Typography>
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

        {renderLoading()}
        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={hdlOnSubmit} disabled={loading}>
            Login
          </Button>
        </Box>
        <Box mt={3}>
          <small>dont have an account ? sign up <Link to="/signup">here</Link></small>
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

export default LoginForms