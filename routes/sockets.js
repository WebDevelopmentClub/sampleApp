module.exports = function (socket) {

    console.log('user '+socket.decoded_token.id+' connected to socket: ' + socket.id);

    // listeners
    socket.on('send', function(data){

        console.log(socket.decoded_token.id+' sent:'+data.message);

        //database

        socket.emit('newMessage', data);
        socket.broadcast.emit('newMessage', data);

    });

    socket.on('disconnect', function () {
        console.log('socket left: '+ socket.id);
    });

};
