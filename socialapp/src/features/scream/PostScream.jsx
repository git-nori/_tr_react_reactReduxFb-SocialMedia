import React, { useState, useEffect } from 'react'

import TooltipIconbtn from '../../components/TooltipIconbtn'
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Button, CircularProgress, makeStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { useSelector } from 'react-redux'

const PostScream = ({ postScream }) => {
  const classes = usestyles()
  const [open, setOpen] = useState(false)
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({})

  const uiErrors = useSelector(state => state.ui.errors)
  const loading = useSelector(state => state.ui.loading)

  useEffect(() => {
    if(uiErrors){
      setErrors(uiErrors)
    }
  }, [uiErrors])
  
  const isValid = () => {
    if(!body){
      setErrors({
        body: 'Must not be blank'
      })
      return false
    }
    return true
  }

  const hdlOpen = () => {
    setOpen(true)
  }

  const hdlClose = () => {
    setOpen(false)
    setErrors({})
    setBody('')
  }

  const hdlChng = (e) => {
    setBody(e.target.value)
  }

  const hdlSubmit = () => {
    if (isValid()){
      const newScream = {
        body
      }
      postScream(newScream)
      hdlClose()
    }
  }

  const renderCirculer = () => {
    if (loading) {
      return <CircularProgress className={classes.circular} size={130} thickness={2.8} />
    }
  }

  return (
    <>
      <TooltipIconbtn tip={"Post a Scream!"} onClick={hdlOpen}>
        <Add />
      </TooltipIconbtn>

      <Dialog open={open} onClose={hdlClose} fullWidth maxWidth="xs">
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <TextField
            name="body"
            type="text"
            label="SCREAM!!"
            multiline
            rows="3"
            placeholder="Scream at your fellow apes"
            error={errors.body ? true : false}
            helperText={errors.body}
            onChange={hdlChng}
            fullWidth
          />
          {renderCirculer()}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={hdlSubmit} disabled={loading}>SUBMIT</Button>
          <Button variant="contained" onClick={hdlClose} disabled={loading}>CANCEL</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const usestyles = makeStyles({
  circular: {
    position: "absolute",
    bottom: "25%",
    left: "40%"
  }
})

export default PostScream