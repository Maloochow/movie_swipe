import React from 'react'

const Layout = (props) => {
    return <div>        
            <h3>Welcome {props.username}</h3>
            <button onClick={props.handleLogOut}>Log Out</button>
           </div>
}

export default Layout