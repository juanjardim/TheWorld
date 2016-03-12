(function () {
	"use strict";

	angular.module("app-trips")
        .controller("tripsController", tripsController);

	function tripsController(dataService) {
		var vm = this;

		vm.trips = [];
		vm.errorMessage = "";
		vm.isBusy = true;
	    getTrips();

		vm.newTrip = {};

		vm.addTrip = function() {
		    vm.trips.push({ name: vm.newTrip.name, created: new Date() });
		    vm.newTrip = {};
		}


        function getTrips() {
            dataService.getTrips()
                .then(function(data) {
                    vm.trips = data;
                    vm.isBusy = false;
                })
                .catch(function(error) {
                    vm.errorMessage = 'Something went wrong! ' + error;
                    vm.isBusy = false;
                });
        }
	}

})();