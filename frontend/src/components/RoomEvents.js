import React from 'react'

const RoomEvents = ({members, events, admin, handleLeave }) => {
    const listMembers = () => {
        if (members.length > 1) {
            const memberList = members.map( member => member.username === admin ? null : <li>{member.username}</li>)
            return (
                <div className="card-text">Members: <ul>{memberList}</ul></div>
            )
        }
     }

    const eventHistory = () => {
         if (events !== []) {
             console.log(events)
            return events.map(event => <li className="list-group-item">{event.username}: {event.event}</li>)
         }
     }

    const handleClick = (e) => {
        e.preventDefault()
        handleLeave()
    }

   return (
       <div>
           <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                <div className="card-text">Admin: <ul>{admin}</ul></div>
                {listMembers()}
                    <h5 className="card-title">Events:</h5>
                    <button onClick={handleClick} className="btn btn-outline-success btn-sm" type="button">Leave Room</button>
                </div>
                <ul className="list-group list-group-flush">
                    {eventHistory()}
                </ul>
           </div>
        </div>
   ) 
}

export default RoomEvents