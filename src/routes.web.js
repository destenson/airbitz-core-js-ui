import React, { Component } from 'react'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'

import Container from './modules/Container.web'
import Signup from './modules/Signup/SignupContainer.web'
import Login from './modules/Login/Login.web'
import Home from './modules/Home/Home.web'
import AccountManagement from './modules/AccountManagement/AccountManagement.web.js'
import ReviewDetails from './modules/ReviewDetails/ReviewDetails.web'
import ChangePin from './modules/ChangePin/ChangePin.web.new.js'
import ChangePassword from './modules/ChangePassword/ChangePassword.web.new.js'

export default class RouterComponent extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Container}>
          <IndexRedirect to='/login' />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/review' component={ReviewDetails} />
          <Route path='/home' component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/account' component={AccountManagement} />
          <Route path='/changepin' component={ChangePin} />
          <Route path='/changepassword' component={ChangePassword} />
        </Route>
      </Router>
    )
  }
}