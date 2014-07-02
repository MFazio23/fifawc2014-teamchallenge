'use strict';

angular
    .module(
        'fifaWC',
        [
            "LocalStorageModule",
            "ngRoute",
            "fifaWC.config",
            "fifaWC.controllers",
            "fifaWC.services",
            "fifaWC.routing",
            "fifaWC.analytics"
        ]
    );

// Azure client
var azureClient = new WindowsAzure.MobileServiceClient(
    "https://fifa-wc.azure-mobile.net/"
);