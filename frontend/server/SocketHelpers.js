module.exports = function(client, clientManager, roomManager) {
    const handleEvent = makeHandleEvent(client, clientManager, roomManager)

    function handleRegister(username, callback) {
        ClientManager.registerClient(client, username)
        return callback(null, username)
    }

    function handleJoin(roomName, callback) {
        const createEntry = () => ({ event: `joined ${roomName}` })
        handleEvent(roomName, createEntry)
          .then(function (room) {
            // add member to room
            room.addUser(client)
            // send chat history to client
            callback(null, room.getRoomHistory())
          })
          .catch(callback)
    }

    function handleLeave(roomName, callback) {
        const createEntry = () => {event: `left ${roomName}`}
        handleEvent(roomName, createEntry)
        .then(function(room) {
            room.removeUser(client.id)
            callback(null)
        })
        .catch(callback)
    }
    function handleVote(roomName, movieName, callback) {
        const createEntry = () => {movie: `${movieName}`}
        handleEvent(roomName, createEntry)
        .then(()=> callback(null))
        .catch(callback)
    }

    function handleCreateRoom(roomName, callback) {
        let room = roomManager.getRoomByName(roomName)
        if (room) {
            callback("room already exist", room.serialize())
        } else {
            room = roomManager.create(roomName)
            callback(null, room.serialize())
        }
    }
    function handleGetRooms(callback) {
        callback(null, roomManager.serializeRooms())
    } 

    function handleDisconnect() {
        clientManager.removeClient(client)
        roomManager.removeClient(client)
    }

    return [
        handleRegister,
        handleJoin,
        handleLeave,
        handleCreateRoom,
        handleGetRooms,
        handleVote,
        handleDisconnect
    ]

}

function makeHandleEvent(client, clientManager, roomManager) {
    function ensureExists(getter, rejectionMessage) {
      return new Promise(function (resolve, reject) {
        const res = getter()
        return res
          ? resolve(res)
          : reject(rejectionMessage)
      })
    }
  
    function ensureUserConnected(clientId) {
      return ensureExists(
        () => clientManager.getUserByClientId(clientId),
        "client doesn't exist"
      )
    }
  
    function ensureValidRoom(roomName) {
      return ensureExists(
        () => roomManager.getRoomByName(roomName),
        `invalid room name: ${roomName}`
      )
    }
  
    function ensureValidRoomAndUserSelected(roomName) {
      return Promise.all([
        ensureValidRoom(roomName),
        ensureUserConnected(client.id)
      ])
        .then(([room, user]) => Promise.resolve({ room, user }))
    }
  
    function handleEvent(roomName, createEntry) {
      return ensureValidRoomAndUserSelected(roomName)
        .then(function ({ room, user }) {
          // append event to chat history
          const entry = { user, ...createEntry() }
          room.addEntry(entry)
  
          // notify other clients in room
          room.broadcastMessage({ room: roomName, ...entry })
          return room
        })
    }
  
    return handleEvent
  }