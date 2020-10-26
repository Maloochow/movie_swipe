import React, { Component } from 'react'
import DisplayRooms from '../components/DisplayRooms'

export default class GetRoom extends Component {

    componentDidMount() {
        this.props.client.getRooms((err, rooms) => {
            if (err) {
                console.error(err)
            } else {
                console.log(rooms)
                this.props.getRooms(rooms)
            }
        })

        this.props.client.receivedRooms((rooms) => {
            console.log(rooms)
            this.props.addRooms(rooms)
        })
    }
        
    handleClick = (e) => {
        e.preventDefault()
        let r = Math.random().toString(36).substring(7);
        this.props.client.createRoom(r, (err, room) => {
            if (err) {
                console.error(err)
            } else {
                console.log(room)
                this.props.addRoomHistory(room)
                this.props.history.push(`/rooms/${room.name}`)
            }
        })
    }

    handleJoin = (e) => {
        e.preventDefault()
        let room = e.target.id
        this.props.client.join(room, (err, roomSerialized, roomHistory) => {
            if (err) {
                console.error(err)
            } else {
                console.log(roomSerialized)
                console.log(roomHistory)
                this.props.addRoomHistory(roomSerialized)
                this.props.addEvents(roomHistory)
                this.props.history.push(`/rooms/${room}`)
            }
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Crate New Room</button>
                <DisplayRooms rooms={this.props.rooms} handleClick={this.handleJoin}/>
            </div>
        )
    }
}
