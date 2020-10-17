const http = require('http').createServer();
const io= require('socket.io')(http)

const makeHandlers = require('./SocketHelpers')
const ClientManager = require('./ClientManager')
const RoomManager = require('./RoomManager')


io.on('connection', client => {
  const {
    handleRegister,
    handleJoin,
    handleLeave,
    handleCreateRoom,
    handleGetRooms,
    handleVote,
    handleDisconnect
  } = makeHandlers(client, ClientManager(), RoomManager())

  client.on('register', handleRegister)

  client.on('join', handleJoin)

  client.on('leave', handleLeave)
  
  client.on('vote', handleVote)
  
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

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });

http.listen(4000, (err) => {
  if (err) throw err
  console.log('listening on: 4000');
});