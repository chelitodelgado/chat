const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola', function(req, res){
    res.status(200).send('Ruta creada');
});

var message = [{
    id: 1,
    text: 'Bienvenido.',
    nickname: 'Bot - kharma'
}];
io.on('connection', function(socket){
    console.log("Nodo "+ socket.handshake.address +" conectado.");
    socket.emit('message', message);

    socket.on('add-message', function(data){
        message.push(data);

        io.sockets.emit('message',message);
    });



});

server.listen(6677, function() {
    console.log("Corriendo servidor....");
    console.log("http://localhost:6677/");
});