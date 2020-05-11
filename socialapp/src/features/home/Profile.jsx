import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import moment from 'moment'

import { Paper, Link as MUILink, Typography, Button, Box, makeStyles, Tooltip, IconButton } from '@material-ui/core'
import { LocationOn, Link as LinkIcon, CalendarToday, Edit, SubdirectoryArrowLeft } from '@material-ui/icons'
import EditDetails from './EditDetails'

const Profile = ({ uploadImage, logout, editUserDetails }) => {
  const classes = useStyls()
  const loading = useSelector(state => state.user.loading)
  const authenticated = useSelector(state => state.user.authenticated)
  const { bio, location, website, email, userId, imageUrl, createdAt, handle } = useSelector(state => state.user.credentials)

  const hdlImageChg = event => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    uploadImage(formData)
  }

  const render = () => {
    if (loading) {
      return <p>...loading</p>
    }
    return authenticated
      ? (
        <Paper className={classes.profile}>
          <Box mb={2}>
            <img className={classes.profileImage} src={imageUrl} alt="profile" />
            <Tooltip title="edit profile image" placement="top">
              <IconButton onClick={() => { document.getElementById('imageInput').click() }}>
                <Edit color="primary" />
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={hdlImageChg} />
              </IconButton>
            </Tooltip>
          </Box>

          <Box mb={2}>
            <MUILink component={Link} to={`/user/${handle}`} color="primary" variant="h5">
              @{handle}
            </MUILink>
          </Box>


          {/* if(bio) <Typography>{bio}</Typography>と同義 */}
          {bio && (
            <div>
              <Box mb={2}>
                <Typography variant="body2">{bio}</Typography>
              </Box>
            </div>
          )}

          {location && (
            <div>
              <Box mb={2} className={classes.wrapIcon}>
                <LocationOn color="primary"></LocationOn>
                <span>{location}</span>
              </Box>
            </div>
          )}

          {website && (
            <div>
              <Box mb={2} className={classes.wrapIcon}>
                <LinkIcon color="primary" />
                <MUILink href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </MUILink>
              </Box>
            </div>
          )}

          <div>
            <Box mb={2} className={classes.wrapIcon}>
              <CalendarToday color="primary" fontSize="small" />{' '}
              <span>Joined {moment(createdAt).format('MMM YYYY')}</span>
            </Box>
          </div>

          <div className={classes.logout}>
            <Box mb={2} className={classes.wrapIcon}>
              <IconButton onClick={() => { logout() }}>
                <SubdirectoryArrowLeft color="primary" fontSize="small" />
              </IconButton>
              <EditDetails editUserDetails={editUserDetails} />
            </Box>
          </div>
        </Paper>
      )
      : (
        <Paper>
          <Typography variant="body2" align="center">
            No profile found
          </Typography>
          <Box mt={3} pb={3} display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >Login</Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/signup"
            >Signup</Button>
          </Box>
        </Paper>
      )
  }

  return (
    <>
      {render()}
    </>
  )
}

const useStyls = makeStyles({
  profile: {
    textAlign: "center"
  },
  profileImage: {
    width: "6.5rem",
    borderRadius: "50%",
    marginLeft: "4rem"
  },
  wrapIcon: {
    display: "inline-flex",
    alignItems: "center"
  },
  logout: {
    textAlign: "left",
  }
})

export default Profile