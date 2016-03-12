describe("Trip Editor Controller", function() {

    var $vm, $controller, $routeParams, $q, $rootScope, dataService;

    beforeEach(module('app-trips'));

    var stops = [
       {
           "id": 1,
           "name": "Atlanta, GA",
           "longitude": -84.387982,
           "latitude": 33.748995,
           "arrival": "2014-06-04T00:00:00"
       }
    ];

    beforeEach(inject(function (_$controller_, _$routeParams_, _$q_, _$rootScope_, _dataService_) {
        $controller = _$controller_;
        $routeParams = _$routeParams_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        dataService = _dataService_;
    }));

    it("should get the stops of a trip", function() {
        spyOn(dataService, "getStops").and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve(stops);
            return deferred.promise;
        });

        $vm = $controller("tripEditorController");
        $vm.stops = [];
        $rootScope.$apply();
        expect($vm.stops[0].name).toBe(stops[0].name);
    });
})