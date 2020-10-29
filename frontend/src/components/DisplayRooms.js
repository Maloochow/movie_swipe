import React from 'react'

const DisplayRooms = ({rooms, handleClick}) => {
    const renderRooms = () => {
    return rooms.map((room) => {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={room.name}>
                {room.name}
                <span className="badge badge-primary badge-pill">{room.numMembers}</span>
                <button type="button" className="btn btn-primary" onClick={handleClick} id={room.name}>Join</button>
            </li>
        )
        })
    }

    return (
        <div>
        <div className="card-body">
            <h5 className="card-title">Current Rooms:</h5>
        </div>
        <ul className="list-group">
            {renderRooms()}
        </ul>
        </div>
        )

}

export default DisplayRooms