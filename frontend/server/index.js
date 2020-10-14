var http = require('http').createServer();
var io= require('socket.io')(http)


io.on('connection', socket => {
    let counter = 0;
    setInterval(() => {
        socket.emit('hello', ++counter)
    }, (1000));
})

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });

http.listen(4000, () => {
  console.log('listening on: 4000');
});