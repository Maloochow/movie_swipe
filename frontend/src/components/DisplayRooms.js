import React from 'react'

const DisplayRooms = ({rooms, handleClick}) => {
    const renderRooms = () => {
    return rooms.map((room) => {
        return (
            <li key={room.name}><p>{room.name}: current has {room.numMembers} members</p>
            <button onClick={handleClick} id={room.name}>Join</button>
            </li>
        )
        })
    }

    return (
        <ul>
            {renderRooms()}
        </ul>
        )

}

export default DisplayRooms