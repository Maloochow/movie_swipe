import React from 'react'

const Layout = (props) => {
    return (
        <div class="card bg-dark text-white">
        <img src="http://teentolady.com/data/cheditor4/1504/20150401181954_cqybxfxl.jpg" class="card-img" alt="april_story" />
        <div class="card-img-overlay">
            <div className="container">
            <h3 class="card-title">Welcome {props.username}</h3>
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link" onClick={props.handleLogOut}>Log Out</a>
                </li>
            </ul>
        </div>
        </div>
        </div>
    )
}

export default Layout