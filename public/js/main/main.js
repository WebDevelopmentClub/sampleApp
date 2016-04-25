(function() {
    'use strict';

    angular
    .module('app')
    .controller('MainController', ['$scope', '$rootScope','$location','AuthToken',
    function($scope, $rootScope, $location, AuthToken) {

        $scope.logout = function() {
            $rootScope.user = undefined;
            AuthToken.clearToken();

            $location.path('/login');
        };

    }]);
}());
