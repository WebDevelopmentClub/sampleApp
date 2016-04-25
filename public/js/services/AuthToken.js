(function() {
    'use strict';

    angular
    .module('app')
    .factory('AuthToken', ['$window', function($window) {

        var tokenKey = 'jwt-token';
        var storage = $window.localStorage;
        var cachedToken;

        return {
            isAuthenticated: isAuthenticated,
            setToken: setToken,
            getToken: getToken,
            clearToken: clearToken,
        };

        function setToken(token) {
            cachedToken = token;
            storage.setItem(tokenKey, token);
        }

        function getToken() {
            if (!cachedToken) {
                cachedToken = storage.getItem(tokenKey);
            }
            return cachedToken;
        }

        function clearToken() {
            cachedToken = null;
            storage.removeItem(tokenKey);
        }

        function isAuthenticated() {
            // returns true if token exists
            return !!getToken();
        }

    }]);

}());
