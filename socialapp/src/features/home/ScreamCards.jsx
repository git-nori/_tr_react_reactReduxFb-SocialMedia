import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import LikeBtn from './LikeBtn'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import TooltipIconbtn from '../../components/TooltipIconbtn'
import { Card, CardContent, CardMedia, Typography, Box, makeStyles } from '@material-ui/core'
import { Chat } from '@material-ui/icons'

const ScreamCards = ({ screams, user, likeScream, unlikeScream,deleteScream }) => {
  const classes = useStyles()

  const { authenticated, credentials, likes, notifications, loading } = user

  const renderDelBtn = (screamId, userHandle) => {
    if (authenticated && credentials.handle === userHandle){
      return (
        <DeleteScream screamId={screamId} deleteScream={deleteScream} />
      )
    }
  }

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
            <Box ml={-2}>
              <LikeBtn screamId={screamId} likes={likes} authenticated={authenticated} likeScream={likeScream} unlikeScream={unlikeScream}/>
              <span>{likeCount}</span>
              <TooltipIconbtn tip={"comments"}>
                <Chat color="primary" />
              </TooltipIconbtn>
              <span>{commentCount}</span>
              {renderDelBtn(screamId, userHandle)}
              <ScreamDialog scream={scream}/>
            </Box>
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