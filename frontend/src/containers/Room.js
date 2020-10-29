import React, { Component } from 'react'
import DisplayMovies from '../components/DisplayMovies'
import Layout from '../components/Layout'
import MovieForm from '../components/MovieForm'
import RoomEvents from '../components/RoomEvents'
import MovieSwipe from './MovieSwipe'

export default class Room extends Component {
    
    currentRoom = this.props.room.currentRoom

    pastMovies = this.props.room.pastEvents.filter( event => event.event==="createMovie")

    isBackButtonClicked = false

    state = {
        roomName: this.currentRoom.name,
        members: this.currentRoom.members,
        movies: this.pastMovies.map(event => ({title: event.movie, vote: 0})),
        events: this.props.room.pastEvents,
        start: false,
        ready: false
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

    handleLeave = () => {
        this.props.client.leave(this.state.roomName, (err)=> {
            console.log("socket handled leave")
            console.error(err)
            this.props.history.push("/")
        })
    }

    onBackButtonEvent = (e) => {
        e.preventDefault();
        if (!this.isBackButtonClicked) {
            if (window.confirm("Confirm to leave this room?")) {
                this.isBackButtonClicked = true;
                this.handleLeave()
            } else {
                window.history.pushState(null, null, window.location.pathname);
                this.isBackButtonClicked = false;
            }
        }
    }

    componentDidMount() {
        //prevent the window from redirecting and insteand call the funtion onBuckButtonEvent
            window.history.pushState(null, null, window.location.pathname);
            window.addEventListener('popstate', this.onBackButtonEvent);

        this.props.client.registerHandler(message => {
            console.log(message)
            if (message.room === this.state.roomName) {
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
            }
        })
    }

    // componentDidUpdate() {
    //     window.onpopstate= (e) => {
    //         console.log("window clicked back")
    //         this.props.client.leave(this.state.roomName, (err)=> {
    //             console.log("socket handled leave")
    //             console.error(err)})
    //     }
    // }

    componentWillUnmount = () => {
        window.removeEventListener('popstate', this.onBackButtonEvent);
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

    handleLogOut = () =>{
        this.props.userLogOut()
        this.props.history.push('/')
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Layout handleLogOut={this.handleLogOut} username={this.props.user.username}/>
                <div className="container">
                <div className="card" style={{marginTop: "20px"}}>
                <div className="card-body">
                    <div className="row">
                    <div className="col-7">
                        <h1>Room: {this.state.roomName}</h1><div className="card">
                        <div className="card-header">
                            Submitted Movies
                        </div>
                        <div className="card-body">
                            { this.state.start? null : <DisplayMovies movies={this.state.movies}/>}
                            { this.state.ready? null : <MovieForm handleMovieSubmit={this.handleMovieSubmit}/>}
                            <div className="row">
                                <div className="col-md-4 ml-auto">
                            <button disabled={this.state.ready} onClick={this.handleReady} className="btn btn-outline-success" type="button" style={{marginRight: "10px"}}>Ready</button>
                            { this.currentRoom.admin.username === this.props.user.username ? <button disabled={!this.isAllReady() || this.state.start} onClick={this.handleStartSwipe} className="btn btn-outline-success" type="button">Start</button> : null }
                                </div>
                            </div>
                            { this.state.start ? <MovieSwipe movies={this.state.movies} handleVote={this.handleVote} handleDoneVoting={this.handleDoneVoting} numUnDone={this.numUnDone}/> : null}
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <RoomEvents members={this.state.members} events={this.state.events} admin={this.currentRoom.admin.username} handleLeave={this.handleLeave}/>
                    </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
        )
    }
}
