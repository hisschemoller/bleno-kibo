const bleCharacteristic = require('./ble-characteristic');
const bleService = require('./ble-service');
const express = require('express');
const app = express();
const port = process.env.PORT || 3014;
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(port, () => {
  console.log('listening on %d', port);
});

app.get('public/', function (req, res) {
  res.sendFile(__dirname + 'index.html');
});

app.use(express.static('public'));

io.sockets.on('connection', function(socket) {
  socket.on('midimessage', function(data) {
    bleService.sendMIDI();
  });
  socket.on('toggle-ble', function(data) {
    console.log('t', data);
    bleService.toggleAdvertising(data.toggle);
  });
});
