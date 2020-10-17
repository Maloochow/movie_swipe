import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { userLogOut } from "../actions/userActions";
import GetRoom from './GetRoom';
import Layout from '../components/Layout'
import Login from './Login'

const Home = (props) => {

    const [ loading, setLoading ] = useState(props.user.loading)
    const [ username, setUsername ] = useState(props.user.username)
    const [ client ] = useState(props.client)

    useEffect(() => {
        setUsername(props.user.username)
        console.log(props)
    }, [ props.user.username, client ])

    const handleLogOut = (e) => {
        props.userLogOut()
    }
    
    if (loading) {
        return <div>Loading...</div>
    } else if (username === "") {
        return (
            <div>
                <Login {...props}/>
            </div>
        )
    } else {
        return (
        <div>
            <Layout />
            <h3>Welcome {username}</h3>
            <button onClick={handleLogOut}>Log Out</button>
            <GetRoom client={client}/>
        </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {...state}
}

export default connect(mapStateToProps, { userLogOut })(Home)