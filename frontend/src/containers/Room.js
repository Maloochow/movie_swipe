import React, { Component } from 'react'
import DisplayMovies from '../components/DisplayMovies'
import Layout from '../components/Layout'
import MovieForm from '../components/MovieForm'
import MovieSwipe from './MovieSwipe'

export default class Room extends Component {
    
    currentRoom = this.props.room.currentRoom

    pastMovies = this.props.room.pastEvents.filter( event => event.event==="createMovie")

    state = {
        roomName: this.currentRoom.name,
        members: this.currentRoom.members,
        movies: this.pastMovies.map(event => ({title: event.movie, vote: 0})),
        events: this.props.room.pastEvents,
        start: false,
        ready: false
    }

    listMembers = () => {
       return this.state.members.map( member => <li>{member.username}</li>)
    }
    eventHistory = () => {
        if (this.state.events !== []) {
            console.log(this.state.events)
           return this.state.events.map(event => <div>{event.username}: {event.event}</div>)
        }
    }

    handleReady = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            members: this.state.members,
            movies: this.state.movies,
            events: this.state.events,
            ready: true
        })
        this.props.client.ready(this.state.roomName, (err) =>  err ? console.error(err) : null)
    }

    handleStartSwipe = (e) => {
        e.preventDefault()
        this.props.client.startSwipe(this.state.roomName, (err) =>  err ? console.error(err) : null)
    }

    handleMovieSubmit = (movie) => {
        this.props.client.createMovie(this.state.roomName, movie, (err) => err ? console.error(err) : null )
    }

    handleVote = (movie) => {
        this.props.client.vote(this.state.roomName, movie, (err) => err ? console.error(err) : null )
    }

    handleDoneVoting = () => {
        this.props.client.doneVoting(this.state.roomName, (err) => err ? console.error(err) : null )
    }

    componentDidMount() {
        this.props.client.registerHandler(message => {
            console.log(message)
            switch (message.event) {
                case "joined":
                    return this.setState({
                        ...this.state,
                        members: this.state.members.concat({username: message.username}),
                        movies: this.state.movies,
                        events: this.state.events.concat(message)
                    })
                    break;
                case "left":
                    return this.setState({
                        ...this.state,
                        members: this.state. members.filter( member => member.username !== message.username),
                        movies: this.state.movies,
                        events: this.state.events.concat(message)
                    })
                case "createMovie":
                    return this.setState({
                        ...this.state,
                        members: this.state.members,
                        movies: [...this.state.movies, { title: message.movie, vote: 0 }],
                        events: this.state.events.concat(message)
                    })
                case "vote":
                    let index = this.state.movies.findIndex(movie => movie.title === message.movie)
                    let movie = this.state.movies[index]
                    return this.setState({
                        ...this.state,
                        members: this.state.members,
                        movies: [...this.state.movies.slice(0, index), { title: movie.title, vote: movie.vote + 1 }, ...this.state.movies.slice(index + 1)],
                        events: this.state.events.concat(message)
                    })
                case "ready":
                    let i = this.state.members.findIndex(member => member.username === message.username)
                    return this.setState({
                        ...this.state,
                        members: [...this.state.members.slice(0, i), {username: message.username, ready: true}, ...this.state.members.slice(i + 1)],
                        movies: this.state.movies,
                        events: this.state.events.concat(message),
                    })
                case "doneVoting":
                    let i2 = this.state.members.findIndex(member => member.username === message.username)
                    return this.setState({
                        ...this.state,
                        members: [...this.state.members.slice(0, i2), {...this.state.members[i2], done: true}, ...this.state.members.slice(i2 + 1)],
                        movies: this.state.movies,
                        events: this.state.events.concat(message),
                    })
                case "startSwipe":
                    return this.setState({
                        ...this.state,
                        members: this.state.members,
                        movies: this.state.movies,
                        events: this.state.events.concat(message),
                        start: true
                     })
                default:
                    return this.state
                    break;
            }
        })
    }

    isAllReady = () => {
        let isReady = true
        this.state.members.map( member => member.ready ? null : isReady = false )
        return isReady
    }

    numUnDone = () => {
        let num = 0
        this.state.members.map( member => member.done ? null : ++num )
        return num
    }

    render() {
        return (
            <div>
                <Layout handleLogOut={this.props.userLogOut} username={this.props.user.username}/>
                <h1>Room: {this.state.roomName}</h1>
                <div>current members: 
                    <ul>
                    {this.listMembers()}
                    </ul>
                </div>
                <div className="activity-log">
                    {this.eventHistory()}
                </div>
                { this.state.ready? null : <MovieForm handleMovieSubmit={this.handleMovieSubmit}/>}
                { this.state.start? null : <DisplayMovies movies={this.state.movies}/>}
                <button disabled={this.state.ready} onClick={this.handleReady}>Ready</button>
                { this.currentRoom.admin.username === this.props.user.username ? <button disabled={!this.isAllReady() || this.state.start} onClick={this.handleStartSwipe}>Start</button> : null }
                { this.state.start ? <MovieSwipe movies={this.state.movies} handleVote={this.handleVote} handleDoneVoting={this.handleDoneVoting} numUnDone={this.numUnDone}/> : null}
            </div>
        )
    }
}
