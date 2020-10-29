const Room = require('./Room')

module.exports = function(currentConnection) {
    currentConnection.rooms = new Map()

    function create(roomName) {
        currentConnection.rooms.set(roomName, new Room(roomName))
        return currentConnection.rooms.get(roomName)
    }
    
    function destroy(roomName) {
        currentConnection.rooms.delete(roomName)
    }

    function getRoomByName(roomName) {
        return currentConnection.rooms.get(roomName)
      }

    function serializeRooms() {
        return Array.from(currentConnection.rooms.values()).map( room => room.serialize())
    }

    function removeClient(client) {
        currentConnection.rooms.forEach(room => {
            if ( room.members.get(client.id) && room.members.get(client.id).user.username === room.admin.username) {
                currentConnection.rooms.delete(room.name)
            } else {
                room.removeUser(client.id)
            }
        })
            
    }

    return {
        create,
        destroy,
        getRoomByName,
        serializeRooms,
        removeClient
    }
}