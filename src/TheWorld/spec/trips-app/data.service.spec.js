describe("Data Service", function () {
    var $httpBackend, dataService;

    var trips = [
        {
            "id": 1,
            "name": "Us trip",
            "created": "2016-03-11T14:01:16.045314",
            "stops": [
                {
                    "id": 1,
                    "name": "Atlanta, GA",
                    "longitude": -84.387982,
                    "latitude": 33.748995,
                    "arrival": "2014-06-04T00:00:00"
                },
                {
                    "id": 33,
                    "name": "New York, NY",
                    "longitude": -74.005941,
                    "latitude": 40.712784,
                    "arrival": "2014-06-09T00:00:00"
                },
                {
                    "id": 34,
                    "name": "Boston, MA",
                    "longitude": -71.05888,
                    "latitude": 42.360082,
                    "arrival": "2014-07-01T00:00:00"
                },
                {
                    "id": 35,
                    "name": "Chicago, IL",
                    "longitude": -87.629798,
                    "latitude": 41.878114,
                    "arrival": "2014-07-10T00:00:00"
                },
                {
                    "id": 36,
                    "name": "Seattle, WA",
                    "longitude": -122.332071,
                    "latitude": 47.606209,
                    "arrival": "2014-08-13T00:00:00"
                },
                {
                    "id": 37,
                    "name": "Atlanta, GA",
                    "longitude": -84.387982,
                    "latitude": 33.748995,
                    "arrival": "2014-08-23T00:00:00"
                }
            ]
        }
    ];

    var newTrip = {
        "name": "My Trip"
    };

    beforeEach(module('app-trips'));

    beforeEach(inject(function (_$httpBackend_, _dataService_) {
        $httpBackend = _$httpBackend_;
        dataService = _dataService_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it("Should return the user trips", function () {
        var response;

        var expectedUrl = "http://localhost:8050/api/trips";

        $httpBackend.when('GET', expectedUrl)
            .respond(200, trips);

        dataService.getTrips()
            .then(function (data) {
                response = data;
            });

        $httpBackend.flush();
        expect(response[0].id).toBe(trips[0].id);
        expect(response[0].name).toBe(trips[0].name);
    });

    it("Should add a new trip", function () {
        var response;
        var expectedUrl = "http://localhost:8050/api/trips";

        $httpBackend.when('POST', expectedUrl)
            .respond(200, newTrip);

        dataService.addTrip()
            .then(function(data) {
                response = data;
            });

        $httpBackend.flush();
        expect(response.name).toBe(newTrip.name);
    });
})