// set up the server environment
var http = require('http');
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var port = process.env.port || 1337;


// Give the exact place or page for the server to load
app.use(express.static(__dirname + '/public'));

// ask the server to listen to localhost:1337
server.listen(port);

// Give a link to the server
app.get('/', function (req, res) {
    res.render('index.html');
});

// main part to receive the message and reponse to that
io.sockets.on('connection', function (socket) { // connect to the client with socket
    socket.on('send msg', function (data) {     // get the data from the client.js with a title of 'send msg'
        
        // send the message which comes from the client.js and send it to everyone with a response
        socket.broadcast.emit('chat msg', data + " ----   ---- Message sent at " + Date().toString());  // broadcast the message to all the clients except me
        io.sockets.emit('get msg', " ---- ---- Server receives message " + data + " at " + Date().toString());  // broadcast the message to all the clients including me
        
    })
    
    // to get to know if a user is connecting to the server 
    console.log('working');
})


/*
var express = require('express');
//var bodyParser = require('body-parser');

var port = process.env.port || 1337;

var app = express();

var server = require('http').createServer(app),
    io = require('socket.io').listen(server);

//server.listen(3000);

//app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

// the Home URL, todos.html in the Vies subfolder.
//app.get('/', function (req, res) {
//    res.render('index.html');
//});

server.listen(port);


  <script src="./angular-route/angular-route.js"></script>
    <script src="./angular-resource/angular-resource.js"></script>
  
 */
