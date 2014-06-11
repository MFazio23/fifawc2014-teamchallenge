'use strict';

angular.module('fifaWC.controllers', [])

    .controller("MainController", function ($scope) {

    })
    .controller("HeaderController", function ($scope, $q, Owner) {
        Owner.getOwners().then(function(result) {
            $scope.owners = result;
        });

        $scope.orderProp = "name";

    })
    .controller("TeamsController", function ($scope, $q, Team) {
        Team.getTeams().then(function(result) {
            $scope.teams = result;
        });

        $scope.orderProp = "name";
    })
    .controller("OwnerController", function($scope, $q, $routeParams, Owner) {
        Owner.getOwner($routeParams.ownerID).then(function(result) {
            $scope.owner = result;
        });
    })
    .controller("FixturesController", function($scope, $q, $routeParams, Games) {
        Games.getGames().then(function(result) {

            $scope.games = [];

            for(var g in result) {
                if(result.hasOwnProperty(g)) {
                    var game = result[g];
                    game.gametime = new Date(game.gametime);
                    game.gameString = game.gametime.toLocaleString();

                    $scope.games.push(game);
                }
            }
        });

        $scope.isESPN = function(channel) {
            return channel === 'ESPN';
        };

        $scope.orderProp = "gametime";
    });