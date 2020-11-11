import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from "react-router-dom";
import LoginNav from '../components/LoginNav';

export default class Login extends Component {
    show = () => {
        if (this.props.notRegistered) {
            return (
                <div style={{height: "100vh", backgroundImage: "url(https://deepestdream.com/wp-content/uploads/2018/08/HaroldAndMaude1.jpg)"}}>
                <div className="nav justify-content-center">
                <div className="card" style={{width: '40%', alignItems: 'center', justifyContent: 'center'}}>
                    <div className="card-body">
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


    render(){
        return (
            <>
            {this.show()}
            </>
        )

    }    

}


