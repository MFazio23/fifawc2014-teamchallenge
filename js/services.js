angular
    .module('fifaWC.services', ['fifaWC.config'])
    .factory('Team', ['$q', '$http', 'kimonoConfig', function ($q, $http, kimonoConfig) {
        return {
            getTeams: function () {
                var deferred = $q.defer();

                //Add this back when going live
                /*azureClient
                 .getTable('teams')
                 .read()
                 .then(function (result) {
                 deferred.resolve(result);
                 });*/

                $q
                    .all(
                        [azureClient.getTable('teams').read(),
                            $http.get(kimonoConfig.kimonoTeamsURL)]
                    )
                    .then(
                    function (result) {
                        var teams = [];
                        var azureTeams = {};
                        $.each(result[0], function (ind, aTeam) {
                            delete aTeam.id;
                            azureTeams[aTeam.name] = aTeam;
                        });

                        $.each(result[1].data, function (ind, kTeam) {
                            var aTeam = azureTeams[kTeam.name];
                            if (typeof aTeam === 'undefined') console.log("Not found =", kTeam.name);

                            teams.push($.extend(kTeam, aTeam));
                        });

                        deferred.resolve(teams);
                    }
                );

                /*$q
                 .all([$http.get('res/teams.json')])
                 .then(function (results) {
                 deferred.resolve(results[0].data);
                 });*/

                return deferred.promise;
            },
            getTeamsByOwner: function (owner) {
                var deferred = $q.defer();

                azureClient
                    .getTable('teams')
                    .where({owner: owner})
                    .orderBy("name")
                    .read()
                    .then(function (result) {
                        deferred.resolve(result);
                    });

                return deferred.promise;

            }
        };
    }])
    .factory('Owner', ['$q', '$http', function ($q, $http) {
        return {
            getOwner: function (ownerID) {
                var deferred = $q.defer();

                azureClient
                    .getTable('owners')
                    .where({id: ownerID})
                    .read()
                    .then(
                    function (result) {
                        deferred.resolve(result[0])
                    }
                );

                return deferred.promise;
            },
            getOwners: function () {
                var deferred = $q.defer();

                //Add this back when going live
                azureClient
                    .getTable('owners')
                    .orderBy("name")
                    .read()
                    .then(function (result) {
                        deferred.resolve(result);
                    });

                /*$q
                 .all([$http.get('res/owners.json')])
                 .then(function (results) {
                 deferred.resolve(results[0].data);
                 });*/

                return deferred.promise;
            }
        };
    }]).factory('Games', ['$q', '$http', 'kimonoConfig', function ($q, $http, kimonoConfig) {
        return {
            getGames: function () {
                var deferred = $q.defer();
                /*azureClient
                 .getTable('games')
                 .take(63)
                 .read()
                 .then(function (result) {
                 deferred.resolve(result);
                 });*/

                $q
                    .all([
                        $http.get(kimonoConfig.kimonoMatchesURL),
                        $http.get(kimonoConfig.kimonoTeamsURL)
                    ])
                    .then(
                    function (result) {
                        var matches = [],
                            teams = {};

                        $.each(result[1].data, function (ind, team) {
                            teams[team.id] = team;
                        });

                        $.each(result[0].data, function (ind, match) {

                            match.awayTeam = teams[match.awayTeamId].name;
                            match.homeTeam = teams[match.homeTeamId].name;

                            matches.push(match);
                        });

                        deferred.resolve(matches);
                    }
                );

                return deferred.promise;
            }
        };
    }]).factory('Rankings', ['$q', '$http', 'Team', 'Games', function ($q, $http, Team, Games) {

        var getPointsFromGame = function (game) {
            var points = { };

            points[game.awayTeam] = getPointsObject(game.awayScore, game.homeScore);
            points[game.homeTeam] = getPointsObject(game.homeScore, game.awayScore);

            return points;
        };

        function getPointsObject(teamScore, opponentScore) {
            var pointsObj = {
                won: teamScore > opponentScore,
                lost: teamScore < opponentScore,
                drew: teamScore == opponentScore,
                goalsFor: teamScore,
                goalsAgainst: opponentScore,
                shutout: opponentScore === 0
            };

            var score = 0;
            score += pointsObj.won ? 3 : 0;
            score += pointsObj.drew ? 1 : 0;
            score += pointsObj.goalsFor > 3 ? 3 : pointsObj.goalsFor;
            score += pointsObj.shutout ? 3 : 0;

            pointsObj.score = score;

            return pointsObj;
        }

        return {
            getPointsForTeam: getPointsFromGame,
            getRankingsByOwner: function () {
                var deferred = $q.defer();

                $q.all([
                        Team.getTeams(),
                        Games.getGames()
                    ]).
                    then(function (result) {
                        var teams = {},
                            owners = {};

                        $.each(result[0], function (ind, team) {
                            team.points = 0;
                            teams[team.name] = team;
                        });

                        $.each(result[1], function (ind, game) {
                            if (game.status !== 'Pre-game') {
                                $.each(getPointsFromGame(game), function (ind, teamGame) {
                                    teams[ind].points += teamGame.score;
                                });
                            }
                        });

                        $.each(teams, function (ind, team) {
                            if (typeof owners[team.owner] === 'undefined') {
                                owners[team.owner] = { points: 0};
                            }
                            owners[team.owner].points += team.points;
                        });

                        deferred.resolve(owners);

                    });

                return deferred.promise;
            }
        };
    }]);