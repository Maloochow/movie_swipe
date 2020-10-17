import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from "react-router-dom";

export default class Login extends Component {
    render(){
        return (
                <div>
                    <LoginForm onSignUp={false} {...this.props}/>
                    or
                    <Link to="/signup">Sign up</Link>
                </div>
                )

    }    

}
