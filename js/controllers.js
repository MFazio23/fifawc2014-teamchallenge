'use strict';

angular.module('fifaWC.controllers', [])

    .controller("MainController", function ($scope) {

    })
    .controller("HeaderController", function ($scope, $q, $route, Owner) {
        Owner.getOwners().then(function(result) {
            $scope.owners = result;
        });

        $scope.getActive = function(name) {
            return $route.current.loadedTemplateUrl.indexOf(name) >= 0 ? "active" : "";
        };

        $scope.orderProp = "name";

    })
    .controller("TeamsController", function ($scope, $q, Team) {
        Team.getTeams().then(function(result) {
            $scope.teams = result;
        });

        $scope.orderProp = "name";
    })
    .controller("TableController", function($scope, Team) {
        Team.getTeams().then(function(result) {
            $scope.teams = result;
        });

        $scope.orderProp = "name";
    })
    .controller("OwnerController", function($scope, $q, $routeParams, Owner, Team) {
        Owner.getOwner($routeParams.ownerID).then(function(result) {
            $scope.owner = result;

            Team.getTeamsByOwner($scope.owner.name).then(function(result) {
                $scope.teams = result;
            });
        });
    })
    .controller("FixturesController", function($scope, $q, $routeParams, Games) {
        var layoutDate = -1;
        Games.getGames().then(function(result) {

            $scope.games = [];

            for(var g in result) {
                if(result.hasOwnProperty(g)) {
                    var game = result[g];
                    game.gameTime = new Date(game.startTime);
                    game.timeString = moment(game.startTime).format("h:mm A") + " CDT";
                    game.gameString = game.teamA + game.teamB;

                    $scope.games.push(game);
                }
            }
        });

        $scope.newDate = function(dateTime, gameString) {
            var date = dateTime.getMonth() + dateTime.getDate();

            if(date !== layoutDate) {
                layoutDate = date;
                $scope.headerString = moment(dateTime).format("dddd, MMMM Do, YYYY");

                return true;
            }

            return false;
        };

        $scope.orderProp = "gameTime";
    })
    .controller("DashboardController", function($scope, $q, $routeParams, Games, Rankings, Team, ownerMapping) {
        Rankings.getRankingsByOwner().then(function(result) {
            $scope.owners = [];
            $.each(result, function(ind, owner) {
                $scope.owners.push({name: ind, points: owner.points});
            });

            Team.getTeams().then(function(result) {
                var teamByOwner = {};
                $.each(result, function(ind, team) {
                    if(typeof teamByOwner[team.owner] === 'undefined') {
                        teamByOwner[team.owner] = [];
                    }

                    teamByOwner[team.owner].push(team.shortname);
                });

                $.each($scope.owners, function(ind, owner) {
                    $scope.owners[ind].teams = teamByOwner[owner.name];
                    $scope.owners[ind].id = ownerMapping[owner.name];
                });

                console.log("Owners =", $scope.owners);
            });
        });

        Games.getGames().then(function(result) {
            $scope.games = [];
            $.each(result, function(ind, game) {
                var start = moment(game.startTime);
                var format = "YYYY-MM-DD";

                if(start.format(format) === moment().format(format)) {
                    game.gameTime = new Date(game.startTime);
                    game.timeString = moment(game.startTime).format("h:mm A") + " CDT";
                    game.gameString = game.teamA + game.teamB;

                    console.log("Game =", game);

                    $scope.games.push(game);
                }
            });
        });
    }).controller("LeadersController", function($scope, $q, $routeParams, Leaders) {
        Leaders.getLeaders().then(function(result) {
            $scope.goalLeaders = result.goalLeaders;
            $scope.assistLeaders = result.assistLeaders;
        });
    });