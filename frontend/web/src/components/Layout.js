import React, { Component } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

export default class Layout extends Component {
    state = {
        messages: ""
    }

    renderConnect = () => {
        socket.on('hello', (counter) => {
            this.setState({
                messages: `hello - ${counter}`
            })
        })
    return <li>{this.state.messages}</li>
    }

    render() {
       
        return (
            <div className="container">
                <ul>
                {this.renderConnect()}
                </ul>
            </div>
        )
    }
}
