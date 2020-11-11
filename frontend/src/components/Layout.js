import React from 'react'
import LoginNav from './LoginNav'

const Layout = (props) => {
    const userLoggedIn = () => {
        if (props.username === "") {
            return <LoginNav />
        } else {
            return (                        
                <div className="card bg-dark text-white">
                <img src="http://teentolady.com/data/cheditor4/1504/20150401181954_cqybxfxl.jpg" className="card-img" alt="april_story" />
                <div className="card-img-overlay">
                    <div className="container">
                    <h3 className="card-title">Welcome {props.username}</h3>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <a className="nav-link" onClick={props.handleLogOut}>Log Out</a>
                        </li>
                    </ul>
                </div>
                </div>
                </div>
            )
        }
    }
    

    return (
        <div className="container">
            {userLoggedIn()}
        </div>
    )
}

export default Layout