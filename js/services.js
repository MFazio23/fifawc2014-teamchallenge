angular
    .module('fifaWC.services', [])
    .factory('Team', ['$q', '$http', function ($q, $http) {
        var getTeams = function () {
            var deferred = $q.defer();

            /* Add this back when going live
             azureClient
             .getTable('teams')
             .read()
             .then(function (result) {
             deferred.resolve(result);
             });*/

            $q
                .all([$http.get('res/teams.json')])
                .then(function (results) {
                    deferred.resolve(results[0].data);
                });

            return deferred.promise;
        };

        return {getTeams: getTeams};
    }]);