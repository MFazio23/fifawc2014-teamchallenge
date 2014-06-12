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
        var layoutDate = -1;
        Games.getGames().then(function(result) {

            $scope.games = [];

            for(var g in result) {
                if(result.hasOwnProperty(g)) {
                    var game = result[g];
                    game.gameTime = new Date(game.gameTime);
                    game.dateString = game.gameTime.toLocaleString();
                    game.gameString = game.teamA + game.teamB;

                    $scope.games.push(game);
                }
            }
        });

        $scope.newDate = function(dateTime, gameString) {
            var date = dateTime.getMonth() + dateTime.getDate();

            if(date !== layoutDate) {
                layoutDate = date;
                $scope.headerString = moment(dateTime).format("MMMM Do, YYYY");

                return true;
            }

            return false;
        };

        $scope.orderProp = "gameTime";
    });