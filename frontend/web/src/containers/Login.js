import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from "react-router-dom";

export default class Login extends Component {
    loggedIn = () => {
        if (this.props.user.username !== "") {
            this.props.history.push('/')
        } else {
        return (
            <div>
                <LoginForm onSignUp={false} {...this.props}/>
                or
                <Link to="/signup">Sign up</Link>
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
