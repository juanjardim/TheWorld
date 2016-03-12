(function () {
    "use strict";

    angular.module("app-trips")
        .controller("tripsController", tripsController);

    tripsController.$inject = ['dataService'];

    function tripsController(dataService) {
        var vm = this;

        vm.trips = [];
        vm.errorMessage = "";
        vm.isBusy = true;
        getTrips();

        vm.newTrip = {};

        vm.addTrip = function () {
            vm.isBusy = true;
            vm.errorMessage = "";
            dataService.addTrip({
                name: vm.newTrip.name,
                created: new Date()
            }).then(function (trip) {
                vm.trips.push(trip);
                vm.isBusy = false;
                vm.newTrip = {};
            })
		    .catch(function (error) {
		        vm.errorMessage = 'Failed to save new trip ';
		        vm.isBusy = false;
		        console.log(vm.errorMessage);
		    });
        }

        function getTrips() {
            dataService.getTrips()
                .then(function (data) {
                    vm.trips = data;
                    vm.isBusy = false;
                })
                .catch(function (error) {
                    vm.errorMessage = 'Something went wrong! ' + error;
                    vm.isBusy = false;
                });
        }
    }

})();