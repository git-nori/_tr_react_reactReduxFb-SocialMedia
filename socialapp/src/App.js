import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import { setAuthenticated, logoutUser, getUserData, markNotificationsRead } from './features/user/userSlice'
import { asyncPostScream } from './features/scream/screamSlice'

import AuthRoute from './components/AuthRoute'
import Navbar from './components/Navbar'
import LoginPage from './features/user/login/LoginPage'
import ScreamsPage from './features/scream/ScreamsPage'
import SignupPage from './features/user/signup/SignupPage'
import UserPage from './features/user/user/UserPage'

function App () {
  const dispatch = useDispatch()
  const history = useHistory()
  const isAuthenticated = useSelector(state => state.user.authenticated)
  const notifications = useSelector(state => state.user.notifications)

  const hdlClkLogout = () => {
    dispatch(logoutUser())
    history.push('/login')
  }

  const hdlClkPostScream = (newScream) => {
    dispatch(asyncPostScream(newScream))
  }

  const markNotifications = (notificationIds) => {
    dispatch(markNotificationsRead(notificationIds))
  }

  useEffect(() => {
    // localStorageからtokenを取得
    const token = localStorage.getItem('FBIdToken')
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp * 1000 < Date.now()) {
        // jwtの有効期限が切れている場合
        dispatch(logoutUser())
        history.push("/login")
      } else {
        dispatch(setAuthenticated())
        axios.defaults.headers.common = { 'Authorization': token }
        dispatch(getUserData())
      }
    }
  }, [])

  return (
    <div className="App">
      <Navbar
        logout={hdlClkLogout}
        isAuthenticated={isAuthenticated}
        postScream={hdlClkPostScream}
        notifications={notifications}
        markNotifications={markNotifications}
      />
      <Switch>
        <Route exact path="/" component={ScreamsPage} />
        <AuthRoute
          exact
          path="/login"
          component={LoginPage}
          isAuthenticated={isAuthenticated}
          redirectPath={"/"} />
        <AuthRoute
          exact
          path="/signup"
          component={SignupPage}
          isAuthenticated={isAuthenticated}
          redirectPath={"/"} />
        <Route exact path="/user/:handle" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
