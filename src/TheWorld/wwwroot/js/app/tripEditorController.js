(function () {

    angular.module("app-trips")
        .controller("tripEditorController", tripEditorController);

    tripEditorController.$inject = ['$routeParams', 'dataService'];

    function tripEditorController($routeParams, dataService) {
        var vm = this;

        vm.tripName = $routeParams.tripName;
        vm.stops = [];
        vm.newStop = {};

        vm.errorMessage = "";
        vm.isBusy = true;

        getStops();

        function getStops() {
            dataService.getStops(vm.tripName)
                .then(function(stops) {
                    vm.stops = stops;
                    vm.isBusy = false;
                    _showMap(stops);
                })
                .catch(function(error) {
                    vm.isBusy = false;
                    vm.errorMessage = 'Failed to get the trip stops ' + error;
                });
        }

        vm.addStop = function () {
            vm.isBusy = true;
            vm.errorMessage = '';
            dataService.addStop(vm.newStop, vm.tripName)
                .then(function(newStop) {
                    vm.stops.push(newStop);
                    vm.isBusy = false;
                    vm.newStop = {};
                    _showMap(vm.stops);
                }).catch(function(error) {
                    vm.isBusy = false;
                    vm.errorMessage = 'Failed to add the new Stop ' + error;
                });
        }
    }

    function _showMap(stops) {
        if (stops && stops.length > 0) {

            var mapStops = _.map(stops, function(item) {
                return {
                    lat: item.latitude,
                    long: item.longitude,
                    info: item.name
                };
            });

            travelMap.createMap({
                stops: mapStops,
                selector: "#map",
                currentStop: 1,
                initialZoom: 3
            });
        }
    }

})();