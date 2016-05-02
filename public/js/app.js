(function() {
    'use strict';

    angular
    .module('app', ['ngRoute','ngResource', 'ngMaterial', 'luegg.directives'])
    .config(['$routeProvider','$locationProvider','$resourceProvider', '$httpProvider',
    function($routeProvider,$locationProvider,$resourceProvider, $httpProvider) {

        $httpProvider.interceptors.push('AuthInterceptor');

        $routeProvider
        .when('/', {
            templateUrl: '/js/home/home.html',
            controller: 'HomeController',
            resolve: {
                data: ['RouteInterceptor', function(RouteInterceptor) {
                    return RouteInterceptor.checkAuth({ error_location: '/login'});
                }]
            }
        })
        .when('/topic/:id', {
            templateUrl: '/js/topic/topic.html',
            controller: 'TopicController',
            resolve: {
                data: ['RouteInterceptor', function(RouteInterceptor) {
                    return RouteInterceptor.checkAuth({ error_location: '/login'});
                }]
            }
        })
        .when('/login', {
            templateUrl: '/js/login/login.html',
            controller: 'LoginController',
            resolve: {
                data: ['RouteInterceptor', function(RouteInterceptor) {
                    return RouteInterceptor.checkAuth({ success_location: '/'});
                }]
            }
        })
        .when('/signup', {
            templateUrl: '/js/signup/signup.html',
            controller: 'SignupController',
            resolve: {
                data: ['RouteInterceptor', function(RouteInterceptor) {
                    return RouteInterceptor.checkAuth({ success_location: '/'});
                }]
            }
        })
        .when('/chat', {
            templateUrl: '/js/chat/chat.html',
            controller: 'ChatController',
            resolve: {
                data: ['RouteInterceptor', function(RouteInterceptor) {
                    return RouteInterceptor.checkAuth({ error_location: '/login'});
                }]
            }
        })
        .otherwise({redirectTo: '/'});

    }]);
}());
