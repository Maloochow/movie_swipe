import React from 'react'

const DisplayMovies = ({movies}) => {
    const displayMovies = () => {
    return movies.map((movie, index) => <li key={index}>{movie.title}</li>)
    }

    return(
        <div>
            <p>Submitted Movies:</p>
            <ul>{displayMovies()}</ul>
        </div>
    )
}

export default DisplayMovies
