var path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const publicPath = path.join(__dirname, 'public');
app.use('/public', express.static(publicPath));

io.origins("*:*");
server.listen(80);

app.get('/', function (req, res) {
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
  socket.join('room');

  socket.on('line-drawn', function(line) {
    io.to('room').emit('line-drawn', line);
  });

  socket.on('point-drawn', function(line) {
    io.to('room').emit('point-drawn', line);
  });
});