describe("Trips Controller", function() {
    var $vm, $controller;

    beforeEach(module('app-trips'));

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_
    }));

    it("Should add a new trip to the trips collections", function() {
        $vm = $controller("tripsController");
        $vm.newTrip = {
            name: "My test Trip"
        };

        $vm.addTrip();

        expect($vm.trips.length).toBe(3);
    })

})