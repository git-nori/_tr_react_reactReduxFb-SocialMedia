import React from 'react'
import { Link } from 'react-router-dom'

import { AppBar, Toolbar, Button } from '@material-ui/core'

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" variant="outlined" component={Link} to="/login">Login</Button>
        <Button color="inherit" variant="outlined" component={Link} to="/">Home</Button>
        <Button color="inherit" variant="outlined" component={Link} to="/signup">Signup</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar