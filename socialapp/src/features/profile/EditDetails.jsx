import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Tooltip, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@material-ui/core'
import { Edit } from '@material-ui/icons'

const EditDetails = ({editUserDetails}) => {
  const credentials = useSelector(state => state.user.credentials)
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [location, setLocation] = useState('')
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const hdlSubmit = () => {
    const userDetails = {
      bio,
      website,
      location
    }
    editUserDetails(userDetails)
    toggleOpen()
  }

  const onChange = (event) => {
    const val = event.target.value
    switch (event.target.name) {
      case 'bio':
        setBio(val)
        break;
      case 'website':
        setWebsite(val)
        break;
      case 'location':
        setLocation(val)
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    credentials.bio ? setBio(credentials.bio) : setBio("")
    credentials.website ? setWebsite(credentials.website) : setWebsite("")
    credentials.location ? setLocation(credentials.location) : setLocation("")
  }, [open])

  return (
    <>
      <Tooltip title="Edit details" placement="top">
        <IconButton onClick={toggleOpen}>
          <Edit color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={toggleOpen} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              value={bio}
              fullWidth
              onChange={onChange}
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              multiline
              placeholder="Your personal/professional website"
              value={website}
              fullWidth
              onChange={onChange}
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              multiline
              placeholder="Where you live"
              value={location}
              fullWidth
              onChange={onChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={toggleOpen}>Cancel</Button>
          <Button color="primary" onClick={hdlSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditDetails