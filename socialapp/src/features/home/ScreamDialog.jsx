import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import LikeBtn from './LikeBtn'
import TooltipIconbtn from '../../components/TooltipIconbtn'
import { Dialog, DialogContent, CircularProgress, makeStyles, Grid, Typography, Box } from '@material-ui/core'
import { Close, Chat, UnfoldMore } from '@material-ui/icons'

const ScreamDialog = ({ scream, likes, authenticated, likeScream, unlikeScream }) => {
  const classes = usestyles()
  const [open, setOpen] = useState(false)

  const loading = useSelector(state => state.ui.loading)

  const { screamId, body, credentials, createdAt, likeCount, commentCount, userImage, userHandle } = scream

  const hdlOpen = () => {
    setOpen(true)
  }

  const hdlClose = () => {
    setOpen(false)
  }

  const renderDlgMarkup = () => {
    return loading
      ? (
        <Box className={classes.cir}>
          <CircularProgress className={classes.circular} size={40} thickness={2.8} />
        </Box>
      )
      : (
        <Grid container>
          <Grid item sm={5}>
            <img src={userImage} alt="profile" className={classes.profileImage} />
          </Grid>
          <Grid item sm={7} className={classes.dlgContent}>
            <Typography
              variant="h5"
              component={Link}
              to={`/users/${userHandle}`}
              color="primary"
              className={classes.link}
            >
              {userHandle}
            </Typography>
            <Typography variant="body2">{moment(createdAt).format('h:mm MMMM DD YYYY')}</Typography>
            <Typography variant="body1">{body}</Typography>
            <Box ml={-2} className={classes.box}>
              <LikeBtn screamId={screamId} likes={likes} authenticated={authenticated} likeScream={likeScream} unlikeScream={unlikeScream} />
              <span>{likeCount}</span>
              <TooltipIconbtn tip={"comments"}>
                <Chat color="primary" />
              </TooltipIconbtn>
              <span>{commentCount}</span>
            </Box>
          </Grid>
        </Grid>
      )
  }

  return (
    <>
      <TooltipIconbtn tip={"Expand scream"} onClick={hdlOpen}>
        <UnfoldMore color="primary" />
      </TooltipIconbtn>

      <Dialog open={open} onClose={hdlClose} fullWidth maxWidth="sm">
        <DialogContent>
          <Box className={classes.closeBtn}>
            <TooltipIconbtn tip={"close"} onClick={hdlClose}>
              <Close />
            </TooltipIconbtn>
          </Box>
          {renderDlgMarkup()}
        </DialogContent>
      </Dialog>
    </>
  )
}

const usestyles = makeStyles({
  cir: {
    position: 'relative'
  },
  circular: {
    position: "absolute",
    bottom: "50%",
    left: "50%"
  },
  profileImage: {
    maxWidth: "100%",
    borderRadius: "50%"
  },
  dlgContent: {
    paddingLeft: "20px",
    "& *": {
      marginTop: "8px"
    }
  },
  link: {
    textDecoration: "none"
  },
  closeBtn: {
    textAlign: "end"
  },
  box: {
    "& button": {
      verticalAlign: "sub"
    }
  }
})

export default ScreamDialog