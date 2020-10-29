import React, { useState } from 'react'

const MovieForm = (props) => {
    const [movie, setMovie] = useState("")
    
    const handleMovieSubmit = (e) => {
        e.preventDefault()
        props.handleMovieSubmit(movie)
        setMovie("")
    }

    return (
        <form onSubmit={handleMovieSubmit}>
            <div className="form-group">
            <label for="movie">Enter Movie Title</label>
            <input type="text" className="form-control" id="movie" onChange={e => setMovie(e.target.value)} value={movie} />
            </div>
            <button type="submit" disabled={movie === ""} className="btn btn-primary">Submit</button>
        </form>
    )
}

export default MovieForm