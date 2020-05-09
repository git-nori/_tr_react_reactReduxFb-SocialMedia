import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Card, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core'

const ScreamCards = ({screams}) => {
  const classes = useStyles()

  const renderCard = () => {
    return screams.map(scream => {
      const { body, screamId, userHandle, createdAt, likeCount, commentCount, userImage } = scream

      return (
        <Card className={classes.card} key={screamId}>
          <CardMedia component="img" image={userImage} title="Profile image" className={classes.image} />
          <CardContent className={classes.content}>
            <Typography
              variant="h5"
              component={Link}
              to={`/users/${userHandle}`}
              color="primary"
              className={classes.link}
            >
              {userHandle}
            </Typography>
            <Typography variant="body2" color="textSecondary">{moment(createdAt).fromNow()}</Typography>
            <Typography variant="body1">{body}</Typography>
          </CardContent>
        </Card>
      )
    })
  }
  return (
    <>
      {renderCard()}
    </>
  )
}

const useStyles = makeStyles({
  card: {
    display: "flex",
    marginBottom: "1.25rem",
  },
  image: {
    minWidth: "12.5rem",
    maxWidth: "12.5rem"
  },
  content: {
    padding: "1.5625rem",
    objectFit: 'cover'
  },
  link: {
    textDecoration: "none",
  }
})

export default ScreamCards