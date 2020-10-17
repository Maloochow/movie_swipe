import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'

export default class SignUp extends Component {
    loggedIn = () => {
        if (this.props.user.username !== "") {
        this.props.history.push('/')
    } else {
        return (
            <div>
                <LoginForm onSignUp={true} {...this.props}/>
            </div>
          )
        }
    }

    render() {
        return (
            <div>
            {this.loggedIn()}
            </div>
        )
    }
}
