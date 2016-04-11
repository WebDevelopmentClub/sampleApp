(function() {
    'use strict';

    angular
    .module('app')
    .controller('HomeController', ['$scope','Topic',
    function($scope, Topic) {

        //controller logic goes here

        Topic.query()
            .$promise.then(
                function(data){
                    console.log(data);
                },
                function(error){
                    console.log(error);
                }
            );


    }]);
}());
