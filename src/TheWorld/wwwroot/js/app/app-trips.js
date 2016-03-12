(function () {
    "use strict";

    angular.module("app-trips", ["ngRoute"])
    .config(configuration);

    configuration.$inject = ['$routeProvider', '$locationProvider'];

    function configuration($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $routeProvider
            .when("/", {
                controller: "tripsController",
                controllerAs: "vm",
                templateUrl: "/view/tripsView.html"
            })
            .when("/editor/:tripName", {
                controller: "tripEditorController",
                controllerAs: "vm",
                templateUrl: "/view/tripEditorView.html"
            })
            .otherwise({
                redirectTo: "/"
            });
    }

})();