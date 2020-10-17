import React, { Component } from 'react'
import DisplayRooms from '../components/DisplayRooms'

export default class GetRoom extends Component {
    state = { rooms: [] }
    
    componentDidMount() {
        
        this.props.client.getRooms((err, rooms) => {
            if (err) {
                console.error(err)
            } else {
                this.setState({
                    ...this.state,
                    rooms: rooms
                })
            }
        })
    }
    
    handleClick = (e) => {
        e.preventDefault()
        let r = Math.random().toString(36).substring(7);
        this.props.client.createRoom(r, (err, room) => {
            if (err) {
                console.error(err)
            } else {
                this.props.history.push(`/rooms/${room.roomName}`)
            }
        })
    }

    handleChange = (e) => {
        this.setState({ 
            ...this.state,
            rooms: this.state.rooms,
            roomName: e.target.value
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Crate New Room</button>
                <DisplayRooms rooms={this.state.rooms}/>
            </div>
        )
    }
}
