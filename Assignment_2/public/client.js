var socket = io();  // check the user connection
var app = angular.module('chatApp', []);

// take socket into use
app.factory('socket', function () {
    var socket = io.connect('http://localhost:1337');
    return socket;
})

// main part to communicate to the server
app.controller('ChatCtrl', function ($scope, socket) {
    $scope.msgs = [];   //define an array to restore messages
    //$scope.time = new Date().toString();    
    $scope.sendMsg = function () {
        if ($scope.msg.text != '') {
            socket.emit('send msg', $scope.msg.text);   // get the messages from the input box named 'inmsg.text'
            //push the message with a confirmation and a time into the array and publish on the index.html
            $scope.msgs.push($scope.msg.text + "  ----   ---- Message sent at " + new Date().toString());
            $scope.msg.text = '';   // make the input box empty so that the user can text new messages
        }
            
    }
    
    // get the message from the server and push it into the array for other users
    socket.on('chat msg', function (data) {
        // the message with sent confirmation
        $scope.msgs.push(data);
        $scope.$digest();
    })
    
    // get the message from the server and push it into the array for all users
    socket.on('get msg', function (data) {
        // the message with server receive confirmation
        $scope.msgs.push(data);
        $scope.$digest();

    })
})


