const http = require('http').createServer();
const io= require('socket.io')(http)

const makeHandlers = require('./SocketHelpers')
const clientManager = require('./ClientManager')
const roomManager = require('./RoomManager')


let currentConnection = {}
const ClientManager = clientManager(currentConnection)
const RoomManager = roomManager(currentConnection)

io.on('connection', client => {

  console.log('client connected...', client.id)
  const [
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
  ] = makeHandlers(client, ClientManager, RoomManager)

  client.on('register', handleRegister)
  
  client.on('join', handleJoin)
  
  client.on('leave', (a,b) => {
    console.log("going to enter handle leave")
    handleLeave(a,b)
  })
  
  client.on('vote', handleVote)
  
  client.on('doneVoting', handleDoneVoting)
  
  client.on('createMovie', handleCreateMovie)
  
  client.on('ready', handleReady)
  
  client.on('startSwipe', handleStartSwipe)

  client.on('createRoom', handleCreateRoom)

  client.on('rooms', handleGetRooms)
  
  client.on('disconnect', function() {
    console.log('client disconnect...', client.id)
    handleDisconnect()
  })

  client.on('error', function(err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })

})


// http.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });

http.listen(4000, (err) => {
  if (err) throw err
  console.log('listening on: 4000');
});