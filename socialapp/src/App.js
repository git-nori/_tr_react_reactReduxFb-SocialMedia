import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import LoginPage from './features/login/LoginPage'
import HomePage from './features/home/HomePage'
import SignupPage from './features/signup/SignupPage'

function App () {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
