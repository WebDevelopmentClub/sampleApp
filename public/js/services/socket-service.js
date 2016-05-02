//http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
(function() {
    'use strict';

    angular
    .module('app')
    .factory('Socket', ['$rootScope', 'AuthToken', function($rootScope, AuthToken) {

        // node server
        var server = 'http://localhost:3030';

        // send token on connecting
        var socket = io.connect(server, {
            'query': 'token=' + AuthToken.getToken()
        });

        console.log('socket', socket);

        return {

            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                      callback.apply(socket, args);
                    });
                });
            },

            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            },
            getSocket: function() {
                return socket;
            }

        };

    }]);

}());