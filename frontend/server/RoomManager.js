const Room = require('./Room')

module.exports = function() {
    const rooms = new Map()

    function create(roomName) {
        rooms.set(roomName, Room(roomName))
    }
    
    function destroy(roomName) {
        rooms.delete(roomName)
    }

    function getRoomByName(roomName) {
        return rooms.get(roomName)
      }

    function serializeRooms() {
        return Array.from(rooms.values()).map( room => room.serialize())
    }

    function removeClient(client) {
        rooms.forEach(room => room.removeUser(client))
    }

    return {
        create,
        destroy,
        getRoomByName,
        serializeRooms,
        removeClient
    }
    
}