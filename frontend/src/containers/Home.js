import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { userLogOut } from "../actions/userActions";
import { addRoomHistory } from '../actions/roomActions'
import GetRoom from './GetRoom';
import Layout from '../components/Layout'
import Login from './Login'

const Home = (props) => {

    const [ loading, setLoading ] = useState(props.user.loading)
    const [ username, setUsername ] = useState(props.user.username)
    const [ client ] = useState(props.client)
    const [history] = useState(props.history)

    useEffect(() => {
        console.log(props)
        setUsername(props.user.username)
        setLoading(props.user.loading)
        if (username !== "") {
            client.register(username, (err, user) => {
                console.log(`errors: ${err}`)
                console.log(user)
            })
        }
    }, [props.user.username ])

    return (
    <div>
        { loading ? <div>Loading...</div> : null}
        { username === "" ? <Login {...props}/> : null }
        { username !== "" ? <div><Layout handleLogOut={props.userLogOut} username={username}/></div> : null}
        <GetRoom client={client} history={history} rooms={props.room.rooms} addRooms={props.addRooms} getRooms={props.getRooms} addRoomHistory={props.addRoomHistory} addEvents={props.addEvents}/>
    </div>
    )

}


const mapStateToProps = (state) => {
    return {...state}
}

export default connect(mapStateToProps, { addRoomHistory })(Home)