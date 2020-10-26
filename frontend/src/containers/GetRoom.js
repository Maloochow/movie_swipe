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

    show = () => {
        if (this.props.isUsername()) {
            return (
                <div class="card" style={{marginTop: "20px"}}>
                    <DisplayRooms rooms={this.props.rooms} handleClick={this.handleJoin}/>
                    <div class="card-body">
                    <button type="button" class="btn btn-primary" onClick={this.handleClick}>Create New Room</button>
                    </div>
                </div>
            )

        }
    }

    render() {
        return (
            <div>
                {this.show()}
            </div>
        )
    }
}
