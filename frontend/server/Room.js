module.exports = function (name) {
    const members = new Map()
    let roomHistory = []
  
    function broadcastMessage(message) {
      members.forEach(m => m.emit('message', message))
    }
  
    function addEntry(entry) {
      roomHistory = roomHistory.concat(entry)
    }
  
    function getRoomHistory() {
      return roomHistory.slice()
    }
  
    function addUser(client) {
      members.set(client.id, client)
    }
  
    function removeUser(client) {
      members.delete(client.id)
    }
  
    function serialize() {
      return {
        name,
        numMembers: members.size
      }
    }
  
    return {
      broadcastMessage,
      addEntry,
      getRoomHistory,
      addUser,
      removeUser,
      serialize
    }
  }