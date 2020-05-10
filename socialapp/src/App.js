import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import { setAuthenticated, logoutUser, getUserData } from './features/auth/userSlice'

import AuthRoute from './components/AuthRoute'
import Navbar from './components/Navbar'
import LoginPage from './features/auth/login/LoginPage'
import HomePage from './features/home/HomePage'
import SignupPage from './features/auth/signup/SignupPage'

function App () {
  const dispatch = useDispatch()
  const history = useHistory()
  const isAuthenticated = useSelector(state => state.user.authenticated)

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
      axios.defaults.headers.common['Authorization'] = token
      dispatch(getUserData())
    }
  }

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
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
      </Switch>
    </div>
  );
}

export default App;
