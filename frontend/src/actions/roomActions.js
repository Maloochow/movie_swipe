export const addRoomHistory = (roomSerialized) => {
    return {type: 'ENTER_ROOM', room: roomSerialized}
}

export const addRooms = (rooms) => {
    return {type: 'ADD_ROOMS', rooms}
}

export const getRooms = (rooms) => {
    return {type: 'GET_ROOMS', rooms}
}

export const addEvents = (events) => {
    return {type: 'ADD_EVENTS', events}
}