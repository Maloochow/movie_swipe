import React from 'react'

const DisplayMovies = ({movies}) => {
    const displayMovies = () => {
    return movies.map((movie, index) => <li className="list-group-item" key={index}>{movie.title}</li>)
    }

    return(
        <ul className="list-group">
            {displayMovies()}
        </ul> 
    )
}

export default DisplayMovies
