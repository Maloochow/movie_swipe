import React from 'react'

const DisplayRooms = ({rooms, handleClick}) => {
    const renderRooms = () => {
    return rooms.map((room) => {
        return (
            <li class="list-group-item d-flex justify-content-between align-items-center" key={room.name}>
                {room.name}
                <span class="badge badge-primary badge-pill">{room.numMembers}</span>
                <button type="button" class="btn btn-primary" onClick={handleClick} id={room.name}>Join</button>
            </li>
        )
        })
    }

    return (
        <div>
        <div class="card-body">
            <h5 class="card-title">Current Rooms:</h5>
        </div>
        <ul class="list-group">
            {renderRooms()}
        </ul>
        </div>
        )

}

export default DisplayRooms