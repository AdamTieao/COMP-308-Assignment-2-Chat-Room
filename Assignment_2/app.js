var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(3000);


app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
    res.render('index.html');
});

// communicating with the client.js
io.sockets.on('connection', function (socket) {
    socket.on('send msg', function (data) { // get the data with a title of 'send msg' from client.js
        // send to server the message with a title 'get msg' and a response of the server
        io.sockets.emit('get msg', " ---- ---- Server receives message " + data + " at " + Date().toString());
        
    })
    
    //console.log('working');
})