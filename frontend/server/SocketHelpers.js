module.exports = function(client, clientManager, roomManager) {
    const handleEvent = makeHandleEvent(client, clientManager, roomManager)

    function handleRegister(username, callback) {
        let user = clientManager.registerClient(client, username)
        console.log(clientManager.getAll())
        return callback(null, user.user.username)
    }

    function handleJoin(roomName, callback) {
        const createEntry = () => ({ event: `joined` })
        handleEvent(roomName, createEntry)
          .then(function (room) {
            // add member to room
            room.addUser(clientManager.getUserByClientId(client.id))
            //update number of member number to the home page
            clientManager.getAll().map(e=> e.client.emit('rooms', roomManager.serializeRooms()))
            // send chat history to client
            callback(null, room.serialize(), room.roomHistory)
          })
          .catch(callback)
    }

    function handleLeave(roomName, callback) {
        const createEntry = () => ({event: `left`})
        handleEvent(roomName, createEntry)
        .then( (room)=> {
          if (room.admin.username === clientManager.getUserByClientId(client.id).user.username) {
            roomManager.destroy(roomName)
          } else {
            room.removeUser(client.id)
          }
            clientManager.getAll().map(e=> e.client.emit('rooms', roomManager.serializeRooms()))
            callback(null)
        })
        .catch(callback)
    }

    function handleReady(roomName, callback) {
        const createEntry = () => ({event: 'ready'})
        handleEvent(roomName, createEntry)
        .then(()=> {
            callback(null)})
        .catch(callback)
    }
    
    function handleVote(roomName, movieName, callback) {
        const createEntry = () => ({ event: 'vote', movie: `${movieName}` })
        handleEvent(roomName, createEntry)
        .then(()=> callback(null))
        .catch(callback)
    }
    
    function handleDoneVoting(roomName, callback) {
        const createEntry = () => ({ event: 'doneVoting' })
        handleEvent(roomName, createEntry)
        .then(()=> callback(null))
        .catch(callback)
    }
    
    function handleCreateMovie(roomName, movieName, callback) {
        const createEntry = () => ({ event: 'createMovie', movie: `${movieName}` })
        handleEvent(roomName, createEntry)
        .then(()=> {
            callback(null)})
            .catch(callback)
        }

    function handleStartSwipe(roomName, callback) {
        const createEntry = () => ({event: 'startSwipe'})
        handleEvent(roomName, createEntry)
        .then(()=> {
            callback(null)})
        .catch(callback)
    }
        
    function handleCreateRoom(roomName, callback) {
        let room = roomManager.getRoomByName(roomName)
        if (room) {
            callback("room already exist", room.serialize())
        } else {
            room = roomManager.create(roomName)
            room.addAdmin(clientManager.getUserByClientId(client.id))
            // console.log(roomManager.serializeRooms())
            clientManager.getAll().map(e=> e.client.emit('rooms', roomManager.serializeRooms()))
            callback(null, room.serialize())
        }
    }
    function handleGetRooms(callback) {
        let rooms = roomManager.serializeRooms()
        console.log(rooms)
        callback(null, rooms)
    } 

    function handleDisconnect() {
        clientManager.removeClient(client)
        roomManager.removeClient(client)
        clientManager.getAll().map(e=> e.client.emit('rooms', roomManager.serializeRooms()))
    }

    return [
        handleRegister,
        handleJoin,
        handleLeave,
        handleCreateRoom,
        handleGetRooms,
        handleVote,
        handleDisconnect,
        handleCreateMovie,
        handleReady,
        handleStartSwipe,
        handleDoneVoting
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
            let username = user.user.username
          const entry = { username, ...createEntry() }
          room.addEntry(entry)
          // notify other clients in room
          room.broadcastMessage({ room: roomName, ...entry })
          return room
        })
    }
  
    return handleEvent
  }