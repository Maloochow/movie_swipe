import React, { Component } from 'react';
import { connect } from 'react-redux'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { isLoggedIn, userLogin, userLogOut, userSignUp } from './actions/userActions'
import Home from "./containers/Home";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import Room from "./containers/Room";
import socket from './actions/SocketClient'

class App extends Component {
  componentDidMount() {
    this.props.isLoggedIn()
    console.log(this.props.user)
  }
  
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' render={props => <Home {...props} client={socket()} {...this.props}/> } />
            <Route exact path='/login' render={props => <Login {...props} {...this.props} />} />
            <Route exact path='/signup' render={props => <SignUp {...props} {...this.props} />} />
            <Route exact path='/rooms/:id' render={props => <Room {...props} {...this.props} />} />
          </Switch>
        </Router>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (user) => dispatch(userLogin(user)),
    userSignUp: (user) => dispatch(userSignUp(user)),
    isLoggedIn: () => dispatch(isLoggedIn()),
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
