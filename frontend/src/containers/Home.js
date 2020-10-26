import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { userLogOut } from "../actions/userActions";
import { addRoomHistory } from '../actions/roomActions'
import GetRoom from './GetRoom';
import Layout from '../components/Layout'
import Login from './Login'
import Loading from '../components/Loading';

const Home = (props) => {

    const [ loading, setLoading ] = useState(props.user.loading)
    const [ username, setUsername ] = useState(props.user.username)
    const [ client ] = useState(props.client)
    const [history] = useState(props.history)

    useEffect(() => {
        console.log(props)
        setUsername(props.user.username)
        setLoading(props.user.loading)
    }, [props.user.username ])

    const isUsername = () => {
        if (username === "") {
            return false
        } else {
            client.register(username, (err, user) => {
                console.log(`errors: ${err}`)
                console.log(user)
            })
            return true
        }
    }

    return (
        <div>
            { isUsername() ? <div><Layout handleLogOut={props.userLogOut} username={username}/></div> : null}
            <div className="container">
            { loading ? <Loading /> : null}
            { isUsername() ? null : <Login {...props}/> }
            <GetRoom client={client} history={history} rooms={props.room.rooms} addRooms={props.addRooms} getRooms={props.getRooms} addRoomHistory={props.addRoomHistory} addEvents={props.addEvents} isUsername={isUsername}/>
            </div>
        </div>
    )

}


const mapStateToProps = (state) => {
    return {...state}
}

export default connect(mapStateToProps, { addRoomHistory })(Home)