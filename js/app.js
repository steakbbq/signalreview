'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('signalReviewApp', [
        'ngRoute',
        'signalReviewApp.filters',
        'signalReviewApp.services',
        'signalReviewApp.directives',
        'signalReviewApp.controllers',
        'signalReviewApp.factories'

    ]).
    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {templateUrl: '/partials/home.html', controller: 'HomeCtrl'});
        $routeProvider.when('/search/:searchString', {templateUrl: '/partials/home.html', controller: 'HomeCtrl'});
        $routeProvider.when('/search', {templateUrl: '/partials/home.html', controller: 'HomeCtrl'});
        $routeProvider.when('/signin', {templateUrl: '/partials/home.html', controller: 'HomeCtrl'});
        $routeProvider.otherwise({redirectTo: ''});

        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode(true);
        }
    }]);

app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }

        return original.apply($location, [path]);
    };
}])

