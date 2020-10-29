module.exports = class Room {

    constructor(name) {
      this.name = name
      this.members = new Map()
      this.roomHistory = []
      this.admin = ""
    }

  
    broadcastMessage(message) {
      this.members.forEach(m => m.client.emit('message', message))
    }
  
    addEntry(entry) {
      this.roomHistory.push(entry)
    }
  
    addAdmin(user) {
        this.addUser(user)
        this.admin = user.user
    }

    addUser(user) {
      this.members.set(user.client.id, user)
    }
  
    removeUser(client) {
      console.log(this.members.delete(client))
      console.log(this.members.has(client))
    }
  
    serialize() {
      return {
        name: this.name,
        numMembers: this.members.size,
        members: Array.from(this.members, ([name, value]) => value.user),
        admin: this.admin
      }
    }
  }
