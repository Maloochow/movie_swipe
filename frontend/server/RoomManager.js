const Room = require('./Room')

module.exports = function(currentConnection) {
    currentConnection.rooms = new Map()

    function create(roomName) {
        currentConnection.rooms.set(roomName, Room(roomName))
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
        currentConnection.rooms.forEach(room => room.removeUser(client))
    }

    return {
        create,
        destroy,
        getRoomByName,
        serializeRooms,
        removeClient
    }
}