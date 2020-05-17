import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Grid, Typography, Box, makeStyles } from '@material-ui/core'

const Comments = ({ comments }) => {
  const classes = useStyles()

  // 最後のコメント以外は区切り線を表示する
  const renderSeparator = (idx) => {
    return idx !== comments.length - 1 &&
      (<hr className={classes.visibleSeparator} />)
  }

  const renderCommentsList = () => {
    return comments.map((comment, idx) => {
      const { userHandle, userImage, body, createdAt, screamId } = comment

      return (
        <Grid container key={idx}>
          <Grid item sm={2}>
            <img src={userImage} alt="comment profile" className={classes.img} />
          </Grid>
          <Grid item sm={9}>
            <Box ml={2}>
              <Typography
                variant="h5"
                component={Link}
                to={`/users/${userHandle}`}
                color="primary"
                className={classes.userLink}>
                {userHandle}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {moment(createdAt).format('h:mm a, MMMM DD YYYY')}
              </Typography>
              <Typography variant="body1">{body}</Typography>
            </Box>
          </Grid>
          {renderSeparator(idx)}
        </Grid>
      )
    })
  }

  return (
    <>
      <Grid container>
        <Grid item sm={12}>
          {renderCommentsList()}
        </Grid>
      </Grid>
    </>
  )
}

const useStyles = makeStyles({
  img: {
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%"
  },
  userLink: {
    textDecoration: "none"
  },
  visibleSeparator: {
    width: "100%"
  }
})

export default Comments