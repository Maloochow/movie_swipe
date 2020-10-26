import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from "react-router-dom";
import LoginNav from '../components/LoginNav';

export default class Login extends Component {
    render(){
        return (
            <div style={{height: "100vh", backgroundImage: "url(https://deepestdream.com/wp-content/uploads/2018/08/HaroldAndMaude1.jpg)"}}>
                <LoginNav signup={false}/>
                <div class="nav justify-content-center">
                <div class="card" style={{width: '40%', alignItems: 'center', justifyContent: 'center'}}>
                    <div class="card-body">
                    <LoginForm onSignUp={false} {...this.props}/>
                    <p></p>
                    <p>or <Link to="/signup">Sign up</Link></p>
                    </div>
                </div>
                </div>
            </div>
        )

    }    

}


