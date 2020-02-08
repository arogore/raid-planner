var path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
server.listen(80);

const socketApp = express();
const socketServer = http.Server(socketApp);
const io = socketio(socketServer);
io.origins("*:*");
socketServer.listen(81);

const publicPath = path.join(__dirname, 'public');
app.use('/public', express.static(publicPath));

app.get('/', function (req, res) {
  console.log('root requested!');
  res.sendFile(__dirname + '/index.html');
});

app.get('/room', function(req, res) {
  const pw = process.env.RAID_PLANNER_PASSWORD;

  if (!pw || req.query.password !== pw) {
    res.sendStatus(401);
  } else {
    res.send("room");
  }
});

io.on('connection', function (socket) {
  console.log('new connection!');
  socket.join('room');

  socket.on('line-drawn', function(line) {
    io.to('room').emit('line-drawn', line);
  });

  socket.on('point-drawn', function(line) {
    console.log('point drawn!');
    io.to('room').emit('point-drawn', line);
  });
});