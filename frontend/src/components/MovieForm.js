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
            <div class="form-group">
            <label for="movie">Enter Movie Title</label>
            <input type="text" class="form-control" id="movie" onChange={e => setMovie(e.target.value)} value={movie} />
            </div>
            <button type="submit" disabled={movie === ""} class="btn btn-primary">Submit</button>
        </form>
    )
}

export default MovieForm