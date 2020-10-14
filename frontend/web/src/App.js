import React, { Component, userState, userEffect} from 'react';
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }
  
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={} />
            <Route exact path='/login' component={} />
            <Route exact path='/signup' component={} />
          </Switch>
        </Router>

        <Layout title="Movie Swipe Card"/>
      </div>
    );
  }
}

export default App;
