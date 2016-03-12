(function () {

    angular.module("app-trips")
        .controller("tripEditorController", tripEditorController);

    function tripEditorController($routeParams, dataService) {
        var vm = this;

        vm.tripName = $routeParams.tripName;
        vm.stops = [];

        vm.errorMessage = "";
        vm.isBusy = true;

        getStops();

        function getStops() {
            dataService.getStops(vm.tripName)
                .then(function(stops) {
                    vm.stops = stops;
                    vm.isBusy = false;
                })
                .catch(function(error) {
                    vm.isBusy = false;
                    vm.errorMessage = 'Failed to get the trip stops ' + error;
                });
        }
    }

})();