import React from 'react'
import { Link } from 'react-router-dom'

import { AppBar, Toolbar, Button, makeStyles } from '@material-ui/core'

const Navbar = ({logout}) => {
  const classes = useStyles()
  return (
    <AppBar position="static" className={classes.AppBar}>
      <Toolbar>
        <Button color="inherit" variant="outlined" component={Link} to="/login">Login</Button>
        <Button color="inherit" variant="outlined" component={Link} to="/">Home</Button>
        <Button color="inherit" variant="outlined" component={Link} to="/signup">Signup</Button>
        <Button color="inherit" variant="outlined" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles({
  AppBar:{
    marginBottom: "1rem"
  }
})

export default Navbar