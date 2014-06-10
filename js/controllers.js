'use strict';

angular.module('fifaWC.controllers', [])

    .controller("MainController", function ($scope) {

    })
    .controller("HeaderController", function ($scope, $q) {
        $scope.owners = [{name:"Michael Fazio"}, {name:"Emad Kazmi"}, {name:"Sergio Piriano"}, {name:"Murphy McGraw"}];

    })
    .controller("TeamsController", function ($scope, $q, Team) {
        Team.getTeams().then(function(result) {
            $scope.teams = result;
        });

        //Team.getTeams();

        $scope.orderProp = "name";
    });