(function() {
    'use strict';

    angular
    .module('app')
    .controller('ChatController', ['$scope', 'Socket', '$rootScope', '$location',
    function($scope, Socket, $rootScope, $location) {

        $scope.messages = [];

        Socket.on('connect', function(){
            console.log('connected');
        });

        Socket.on('disconnect', function(){
            console.log('disconnected');
        });

        $scope.sendMessage = function(messageText){
            Socket.emit('send', {user: $rootScope.user.email, message: messageText});
        };

        Socket.on('newMessage', function(data){
            console.log(data);

            $scope.messages.push(data);
        });

    }]);
}());
