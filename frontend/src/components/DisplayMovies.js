import React from 'react'

const DisplayMovies = ({movies}) => {
    const displayMovies = () => {
    return movies.map((movie, index) => <li class="list-group-item" key={index}>{movie.title}</li>)
    }

    return(
        <ul class="list-group">
            {displayMovies()}
        </ul> 
    )
}

export default DisplayMovies
