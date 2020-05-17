import React, { useState, useEffect } from 'react'

import { Button, TextField, makeStyles } from '@material-ui/core'

const CommentForm = ({ errors, authenticated, screamId, submitComment }) => {
  const classes = useStyles()
  const [body, setBody] = useState('')
  const [error, setError] = useState({})

  useEffect(() => {
    errors && setError(errors)
  }, [errors])

  const hdlChng = (e) => {
    setBody(e.target.value)
  }

  const submit = () => {
    const data = {
      body
    }
    submitComment(screamId, data)
    setBody('')
  }

  return (
    <form className={classes.form}>
      <TextField
        type="text"
        name="body"
        label="Comment on screen"
        fullWidth
        error={error.comment ? true : false}
        helperText={error.comment}
        value={body}
        onChange={hdlChng}
        className={classes.input}
      ></TextField>
      <Button variant="contained" color="primary" onClick={submit}>Submit</Button>
    </form>
  )
}

const useStyles = makeStyles({
  form: {
    width: "100%",
    textAlign: "center"
  },
  input: {
    marginBottom: "1rem"
  }
})

export default CommentForm