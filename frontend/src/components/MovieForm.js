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
            <label htmlFor="movie">Enter Your Movie Title:</label>
            <input type="text" name="movie" onChange={e => setMovie(e.target.value)} value={movie} />
            <button type="submit" disabled={movie === ""}>Submit</button>
        </form>
    )
}

export default MovieForm