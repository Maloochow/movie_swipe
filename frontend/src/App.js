import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { isLoggedIn, userLogin, userLogOut, userSignUp } from './actions/userActions'
import { addRooms, getRooms, addEvents } from "./actions/roomActions";
import Home from "./containers/Home";
import SignUp from "./containers/SignUp";
import Room from "./containers/Room";
import socket from './actions/SocketClient'
import Layout from './components/Layout';

const client = socket()

class App extends Component {
  componentDidMount() {
    this.props.isLoggedIn()
    console.log(this.props.user)
  }

  render() {
    return (
      <div>
        <Layout handleLogOut={this.props.userLogOut} username={this.props.user.username}/>
        <Router>
          <Switch>
            <Route exact path='/' render={props => <Home {...props} client={client} {...this.props}/> } />
            <Route exact path='/signup' render={props => <SignUp {...props} {...this.props} />} />
            <Route exact path={'/rooms/:id'} render={props => <Room {...props} client={client} {...this.props} />} />
            <Route render={ () => <p>This page doesn't exist</p>} />
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
    addRooms: (rooms) => dispatch(addRooms(rooms)),
    getRooms: (rooms) => dispatch(getRooms(rooms)),
    userLogOut: () => dispatch(userLogOut()),
    addEvents: (events) => dispatch(addEvents(events))
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
