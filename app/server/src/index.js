var path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const LobbyManager = require('./lobby-manager');

const app = express();
const server = http.Server(app);
const io = socketio(server, { path: '/planner/socket.io/' });

const lobbyManager = new LobbyManager();

io.origins("*:*");
server.listen(23451);

app.get('/room', cors(), function(req, res) {
  const pw = 'test';//process.env.RAID_PLANNER_PASSWORD;

  if (!pw || req.query.password !== pw) {
    res.sendStatus(401);
  } else {
    const lobby = lobbyManager.createLobby();
    res.send(lobby.id);
  }
});

io.on('connection', function (socket) {
  socket.on('line-drawn', function(line) {
    socket.broadcast.to(socket.room).emit('line-drawn', line);
  });

  socket.on('point-drawn', function(point) {
    socket.broadcast.to(socket.room).emit('point-drawn', point);
  });

  socket.on('join-room', function(room) {
    socket.leaveAll();
    socket.join(room);
    socket.room = room;
  });
});