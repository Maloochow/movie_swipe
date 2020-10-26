import React from 'react'
import { Link } from "react-router-dom";

const LoginNav = ({ signup }) => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link"><Link to="/">Login</Link><span class="sr-only">{ signup ? null : "(current)"}</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link"><Link to="/signup">Sign up</Link><span class="sr-only">{ signup ? "(current)" : null}</span></a>
            </li>
            </ul>
        </nav>
        )
}

export default LoginNav