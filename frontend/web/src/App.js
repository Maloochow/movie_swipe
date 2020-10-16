import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { isLoggedIn, userLogin, userLogOut, userSignUp } from './actions/userActions'
import Home from "./containers/Home";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";

class App extends Component {

  componentDidMount() {
    this.props.isLoggedIn()
  }
  
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/login' render={props => <Login {...props} {...this.props} />} />
            <Route exact path='/signup' render={props => <SignUp {...props} {...this.props} />} />
          </Switch>
        </Router>

        <Layout title="Movie Swipe Card"/>
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
