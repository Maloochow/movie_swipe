const io = require('socket.io-client')

export default function() {
    const socket = io('http://localhost:4000')
    
    function registerHandler(onMessageReceived) {
        socket.on('message', onMessageReceived)
    }

    function receivedRooms(onRoomsReceived) {
        socket.on('rooms', onRoomsReceived)
    }
    
    function unregisterHandler() {
        socket.off('message')
    }
    
    socket.on('error', function (err) {
        console.error(`received socket error: ${err}`)
    })
    
    function register(username, cb) {
        socket.emit('register', username, cb)
    }
    
    function join(roomName, cb) {
        socket.emit('join', roomName, cb)
    }
    
    function leave(roomName, cb) {
        socket.emit('leave', roomName, cb)
    }
    
    function ready(roomName, cb) {
        socket.emit('ready', roomName, cb)
    }
    
    function startSwipe(roomName, cb) {
        socket.emit('startSwipe', roomName, cb)
    }
    
    function vote(roomName, movieName, cb) {
        socket.emit('vote', roomName, movieName, cb)
    }
    
    function doneVoting(roomName, cb) {
        socket.emit('doneVoting', roomName, cb)
    }

    function createMovie(roomName, movieName, cb) {
        socket.emit('createMovie', roomName, movieName, cb)
    }
    
    function createRoom(roomName, cb) {
        socket.emit('createRoom', roomName, cb)
    }
    
    function getRooms(cb) {
        socket.emit('rooms', cb)
    }
    
    function getAvailableUsers(cb) {
        socket.emit('availableUsers', null, cb)
    }

    return {
        socket,
        register,
        join,
        leave,
        vote,
        createRoom,
        getRooms,
        getAvailableUsers,
        registerHandler,
        receivedRooms,
        unregisterHandler,
        createMovie,
        ready,
        startSwipe,
        doneVoting
    }
}
