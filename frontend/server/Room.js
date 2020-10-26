module.exports = function (name) {
    members = new Map()
    roomHistory = []
    admin = ""
  
    function broadcastMessage(message) {
      members.forEach(m => m.client.emit('message', message))
    }
  
    function addEntry(entry) {
      roomHistory = roomHistory.concat(entry)
    }
  
    function getRoomHistory() {
      return roomHistory.slice(0)
    }
  
    function addAdmin(user) {
        addUser(user)
        admin = user.user
    }

    function addUser(user) {
      members.set(user.client.id, user)
    }
  
    function removeUser(client) {
      members.delete(client.id)
    }
  
    function serialize() {
      return {
        name,
        numMembers: members.size,
        members: Array.from(members, ([name, value]) => value.user),
        admin: admin
      }
    }
  
    return {
        broadcastMessage,
        addEntry,
        getRoomHistory,
        addUser,
        removeUser,
        serialize,
        addAdmin
    }
  }