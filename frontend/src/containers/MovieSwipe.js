import React, { Component } from 'react'
import { isNullOrUndefined } from 'util'

export default class MovieSwipe extends Component {
    state = {
        i: 0,
        done: false
    }
    
    currentMovie = () => this.props.movies[this.state.i]

    handleVote = (e) => {
        e.preventDefault()
        this.props.handleVote(this.currentMovie().title)
        this.ifDone()
    }

    handleSkip = (e) => {
        e.preventDefault()
        this.ifDone()
    }

    ifDone = () => {
        if (this.state.i === this.props.movies.length - 1) {
            this.props.handleDoneVoting()
            return this.setState({ ...this.state, done: true })
        } else if ( this.state.i < this.props.movies.length) {
            return this.setState({ ...this.state, i: this.state.i + 1 })
        }
    }

    movieCard = () => {
        return (
            <div>
            <p>{this.currentMovie().title}</p>
            <button onClick={e => this.handleVote(e)}>Vote</button>
            <button onClick={e => this.handleSkip(e)}>Skip</button>
            </div>
        )
    }

    winningMovie = () => {
        let movie = this.props.movies[0]
        this.props.movies.map( m => m.vote > movie.vote ? movie = m : null )
        return (<div>Winning Movie is: {movie.title}</div>)
    }

    render() {
        return (
            <div>
                { this.state.done ? <div>You have voted for all movies~ Waiting on {this.props.numUnDone()} people to finish voting</div> : this.movieCard() }
                { this.props.numUnDone() === 0 ? this.winningMovie() : null }
            </div>
        )
    }
}
