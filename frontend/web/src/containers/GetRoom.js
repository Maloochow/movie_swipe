import React, { Component } from 'react'
import DisplayRooms from '../components/DisplayRooms'

export default class GetRoom extends Component {
    state = { roomName: "", rooms: [] }
    
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
        this.props.client.createRoom(this.state.roomName)
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
