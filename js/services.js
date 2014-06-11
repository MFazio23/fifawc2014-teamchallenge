angular
    .module('fifaWC.services', [])
    .factory('Team', ['$q', '$http', function ($q, $http) {
        return {getTeams: function () {
            var deferred = $q.defer();

            //Add this back when going live
            /*azureClient
             .getTable('teams')
             .read()
             .then(function (result) {
             deferred.resolve(result);
             });
             */

            $q
                .all([$http.get('res/teams.json')])
                .then(function (results) {
                    deferred.resolve(results[0].data);
                });

            return deferred.promise;
        }};
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
                /*azureClient
                 .getTable('owners')
                 .read()
                 .then(function (result) {
                 deferred.resolve(result);
                 });
                 */

                $q
                    .all([$http.get('res/owners.json')])
                    .then(function (results) {
                        deferred.resolve(results[0].data);
                    });

                return deferred.promise;
            }
        };
    }]).factory('Games', ['$q', '$http', function ($q, $http) {
        return {
            getGames: function () {
                var deferred = $q.defer();
                azureClient
                    .getTable('games')
                    .read()
                    .then(function (result) {
                        deferred.resolve(result);
                    });

                return deferred.promise;
            }
        };
    }]);