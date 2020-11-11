import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import LoginNav from '../components/LoginNav';

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
            <div class="container" >
                <div style={{height: "100vh", backgroundImage: "url(https://deepestdream.com/wp-content/uploads/2018/08/HaroldAndMaude1.jpg)"}} >
                    <div class="nav justify-content-center">
                    <div class="card" style={{width: '40%', alignItems: 'center', justifyContent: 'center'}}>
                    <div class="card-body">
                {this.loggedIn()}
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
