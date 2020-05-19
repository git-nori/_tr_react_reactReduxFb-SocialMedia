import React from 'react'
import { Link } from 'react-router-dom'

import moment from 'moment'

import { Paper, Link as MUILink, Box, makeStyles } from '@material-ui/core'
import { CalendarToday } from '@material-ui/icons'

const StaticProfile = ({ loading, imageUrl, createdAt, handle }) => {
  const classes = useStyls()

  const render = () => {
    if (loading) {
      return <p>...loading</p>
    }
    return (
      <Paper className={classes.profile}>
        <Box mb={2} className={classes.profileBox}>
          <img className={classes.profileImage} src={imageUrl} alt="profile" />
        </Box>

        <Box mb={2}>
          <MUILink component={Link} to={`/user/${handle}`} color="primary" variant="h5">
            @{handle}
          </MUILink>
        </Box>

        <div>
          <Box mb={2} className={classes.wrapIcon}>
            <CalendarToday color="primary" fontSize="small" />{' '}
            <span>Joined {moment(createdAt).format('MMM YYYY')}</span>
          </Box>
        </div>
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
  profileBox: {
    position: "relative"
  },
  profileIcon: {
    position: "absolute",
    right: "15%",
    top: "50%"
  },
  profileImage: {
    maxWidth: "5rem",
    borderRadius: "50%",
  },
  wrapIcon: {
    display: "inline-flex",
    alignItems: "center"
  },
  logout: {
    textAlign: "left",
  }
})

export default StaticProfile