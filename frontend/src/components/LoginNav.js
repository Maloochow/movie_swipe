import React from 'react'
import { Link } from "react-router-dom";

const LoginNav = () => {
    const signup = () => {
        return (window.location.pathname === "/signup" ? true : false)
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
                {/* <a className="nav-link"><Link to="/">Login</Link><span className="sr-only">{ signup() ? null : "(current)"}</span></a> */}
                <a className="nav-link" href="/">Login<span className="sr-only">{ signup() ? null : "(current)"}</span></a>
            </li>
            <li className="nav-item">
                {/* <a className="nav-link"><Link to="/signup">Sign up</Link><span className="sr-only">{ signup() ? "(current)" : null}</span></a> */}
                <a className="nav-link" href="/signup">Sign up<span className="sr-only">{ signup() ? "(current)" : null}</span></a>
            </li>
            </ul>
        </nav>
        )
}

export default LoginNav