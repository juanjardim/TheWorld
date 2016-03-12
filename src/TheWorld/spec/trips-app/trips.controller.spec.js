describe("Trips Controller", function() {
    var $q, $vm, $controller, $rootScope, dataService;
    var results = [
        {
            "id": 1,
            "name": "Us trip",
            "created": "2016-03-11T14:01:16.045314"
        },
        {
            "id": 2,
            "name": "World trip",
            "created": "2016-03-11T14:01:16.1179694"
        }
    ];
    beforeEach(module('app-trips'));

    beforeEach(inject(function(_$q_, _$controller_, _$rootScope_, _dataService_) {
        $controller = _$controller_;
        dataService = _dataService_;
        $rootScope = _$rootScope_;
        $q = _$q_;
    }));


    it("Should add a new trip to the trips collections", function() {
        $vm = $controller("tripsController");
        $vm.trips = [];
        $vm.newTrip = {
            name: "My test Trip"
        };

        $vm.addTrip();

        expect($vm.trips.length).toBe(1);
    });

    it("Should get all the trips of user", function() {

        spyOn(dataService, 'getTrips').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });

        $vm = $controller("tripsController");
        $rootScope.$apply();
        expect($vm.trips.length).toBe(results.length);
        expect($vm.trips[0].name).toBe(results[0].name);
    });

});