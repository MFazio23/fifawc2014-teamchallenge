angular
    .module("fifaWC.analytics", ['ng'])
    .run(function ($rootScope, analytics) {
        $rootScope.$on('$viewContentLoaded', function () {
            analytics.trackEvent();
        })
    })
    .factory(
    'analytics',
    function ($location, $window) {
        return {
            trackEvent: function () {
                //console.log("Tracking event -", $location.path());
                $window.ga(
                    'send',
                    'pageview',
                    {
                        page: $location.path()
                    }
                );
            }
        }
    }
);