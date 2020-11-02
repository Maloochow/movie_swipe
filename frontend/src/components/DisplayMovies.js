import React, { useState } from 'react'
import DisplayMovie from './DisplayMovie'

const DisplayMovies = ({movies}) => {


    const displayMovies = () => {
    return movies.map((movie, index) => <DisplayMovie movie={movie}/>)
    }

    return(
        <ul className="list-group">
            {displayMovies()}
        </ul> 
    )
}

export default DisplayMovies
