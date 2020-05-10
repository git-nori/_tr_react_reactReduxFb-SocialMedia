import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'

import { makeStyles, Typography, FormControl, TextField, Button, Box, CircularProgress } from '@material-ui/core'

const SignupForms = () => {
  const classes = useStyles()

  const history = useHistory()

  const [handle, setHandle] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

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
    setLoading(true)
    const userData = {
      email,
      password,
      confirmPassword,
      handle
    }
    axios.post('/signup', userData)
      .then(res => {
        console.log(res.data)
        // localStorageにTokenを保存
        localStorage.setItem('FBIdToken', `Bearer ${res.data.userToken}`)
        setLoading(false)
        history.push('/')
      })
      .catch(err => {
        setLoading(false)
        setErrors(err.response.data)
      })
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