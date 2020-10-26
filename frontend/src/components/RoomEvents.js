import React from 'react'

const RoomEvents = ({members, events}) => {
    const listMembers = () => {
        return members.map( member => <li>{member.username}</li>)
     }
    const eventHistory = () => {
         if (events !== []) {
             console.log(events)
            return events.map(event => <li class="list-group-item">{event.username}: {event.event}</li>)
         }
     }

   return (
       <div>
           <div class="card" style={{width: "18rem"}}>
                <div class="card-body">
                    <h5 class="card-title">Events:</h5>
                <p class="card-text">Members: <ul>{listMembers()}</ul></p>
                </div>
                <ul class="list-group list-group-flush">
                    {eventHistory()}
                </ul>
           </div>
        </div>
   ) 
}

export default RoomEvents