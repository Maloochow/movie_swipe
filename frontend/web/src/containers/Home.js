import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { userLogOut } from "../actions/userActions";

const Home = (props) => {

    const [ loading, setLoading ] = useState(props.user.loading)
    const [ username, setUsername ] = useState(props.user.username)

    useEffect(() => {
        console.log(props)
        setLoading(props.user.loading)
        setUsername(props.user.username)
    }, [props.user])

    const handleLogOut = (e) => {
        props.userLogOut()
    }
    

    const isLoggedIn = () => {
        if (loading) {
            return <div>Loading...</div>
        } else if (username === "") {
            return (
                <div>
                  <Link to='/login'>Login</Link>
                  <Link to='/signup'>Sign Up</Link>  
                </div>
            )
        } else {
            return (
            <div>
                <h3>Welcome {username}</h3>
                <button onClick={handleLogOut}>Log Out</button>
            </div>
            )
        }
    }

    return isLoggedIn()
}


const mapStateToProps = (state) => {
    return {...state}
}

export default connect(mapStateToProps, { userLogOut })(Home)