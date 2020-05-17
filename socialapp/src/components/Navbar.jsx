import React from 'react'
import { Link } from 'react-router-dom'

import PostScream from '../features/scream/PostScream'
import TooltipIconbtn from './TooltipIconbtn'
import { AppBar, Toolbar, Box, makeStyles } from '@material-ui/core'
import { Home, Notifications, ExitToApp, AccountBox } from '@material-ui/icons'

const Navbar = ({ logout, isAuthenticated, postScream }) => {
  const classes = useStyles()

  const renderBtn = () => {
    return isAuthenticated
      ? (
        <Box className={classes.appBarBtn}>
          <PostScream postScream={postScream}/>
          <Link to="/">
            <TooltipIconbtn tip={"Home"}><Home /></TooltipIconbtn>
          </Link>
          <TooltipIconbtn tip={"Notifications"}><Notifications /></TooltipIconbtn>
          <TooltipIconbtn tip={"Logout"} onClick={logout}><ExitToApp /></TooltipIconbtn>
        </Box>
      ) : (
        <Box className={classes.appBarBtn}>
          <Link to="/login">
            <TooltipIconbtn tip={"Login"}><ExitToApp /></TooltipIconbtn>
          </Link>
          <Link to="/">
            <TooltipIconbtn tip={"Home"}><Home /></TooltipIconbtn>
          </Link>
          <Link to="/signup">
            <TooltipIconbtn tip={"Signup"}><AccountBox /></TooltipIconbtn>
          </Link>
        </Box>
      )
  }

  return (
    <AppBar position="static" className={classes.AppBar}>
      <Toolbar>
        {renderBtn()}
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(theme => ({
  AppBar: {
    marginBottom: "1rem"
  },
  appBarBtn: {
    '& a': {
      textDecoration: "none"
    },
    '& svg': {
      color: "white"
    }
  }
}))

export default Navbar