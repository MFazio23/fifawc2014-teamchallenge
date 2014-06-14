'use strict';

angular
    .module(
        'fifaWC',
        [
            "ngRoute",
            "fifaWC.config",
            "fifaWC.controllers",
            "fifaWC.services",
            "fifaWC.routing"
        ]
    );

// Azure client
var azureClient = new WindowsAzure.MobileServiceClient(
    "https://fifa-wc.azure-mobile.net/",
    "uksxBgKVVyIFHAfImEQvKfIsGbOymU33"
);