angular
    .module('fifaWC.routing', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController'
            })
            .when('/teams', {
                templateUrl: 'views/teams.html',
                controller: 'TeamsController'
            })
            .when('/fixtures', {
                templateUrl: 'views/fixtures.html',
                controller: 'FixturesController'
            })
            .when('/table', {
                templateUrl: 'views/table.html',
                controller: 'TableController'
            })
            .when('/owner/:ownerID', {
                templateUrl: 'views/owner.html',
                controller: 'OwnerController'
            });

        //TODO: Unless you can get this render properly from the server-side, the links break.
        //$locationProvider.html5Mode(true);
    });