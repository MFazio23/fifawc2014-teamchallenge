angular
    .module('fifaWC.routing', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'MainController'
            })
            .when('/teams', {
                templateUrl: 'views/teams.html',
                controller: 'TeamsController'
            });

        //TODO: Unless you can get this render properly from the server-side, the links break.
        //$locationProvider.html5Mode(true);
    });