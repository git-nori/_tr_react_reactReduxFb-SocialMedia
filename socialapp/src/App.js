import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import { setAuthenticated, logoutUser, getUserData } from './features/user/userSlice'
import { asyncPostScream } from './features/scream/screamSlice'

import AuthRoute from './components/AuthRoute'
import Navbar from './components/Navbar'
import LoginPage from './features/user/login/LoginPage'
import ScreamsPage from './features/scream/ScreamsPage'
import SignupPage from './features/user/signup/SignupPage'

function App () {
  const dispatch = useDispatch()
  const history = useHistory()
  const isAuthenticated = useSelector(state => state.user.authenticated)

  const hdlClkLogout = () => {
    dispatch(logoutUser())
    history.push('/login')
  }

  const hdlClkPostScream = (newScream) => {
    dispatch(asyncPostScream(newScream))
  }

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
      axios.defaults.headers.common = {'Authorization': token}
      dispatch(getUserData())
    }
  }

  return (
    <div className="App">
      <Navbar logout={hdlClkLogout} isAuthenticated={isAuthenticated} postScream={hdlClkPostScream} />
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
      </Switch>
    </div>
  );
}

export default App;
