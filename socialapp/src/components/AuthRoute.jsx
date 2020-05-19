import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({ component: Component, isAuthenticated, redirectPath, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated
          ? <Redirect to={{ pathname: `${redirectPath}`, state: { from: props.location } }} />
          : <Component {...props} />
      }}
    />
  )
}

export default AuthRoute