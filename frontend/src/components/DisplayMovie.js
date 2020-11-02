import React, { useState } from 'react'

const DisplayMovie = ({ movie }) => {
    const [like, setLike] = useState(0)
    const [title, setTitle] = useState(movie.title)

    
    return (
        <div>
            <li>
                {title}
                Likes: {like}
                <button onClick={e=> setLike(like + 1)}>Like</button>
            </li>
        </div>
    )
}

export default DisplayMovie