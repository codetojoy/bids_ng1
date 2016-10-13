describe("Config Controller Test", function () {
 
    var mockScope, configController, mainController;
    var strategyService;
 
    beforeEach(angular.mock.module("bids"));
 
    beforeEach(angular.mock.inject(function ($controller, $rootScope, StrategyService) { 
        mockScope = $rootScope.$new();
        mainController = $controller("mainController", {
            $scope: mockScope
        });
        configController = $controller("configController", {
            $scope: mockScope
        });
        strategyService = StrategyService;
    }));

    // -------- tests

    it("can validate numCards config", function () {
        var MAX = "dummy";
        var p1 = {name: "You", hand: [1,8,4], strategy: MAX, score: 0, isHuman: true};
        var p2 = {name: "Van Halen", hand: [9,6,2], strategy: MAX, score: 0, isHuman: false};
        var p3 = {name: "Rhoads", hand: [3,7,10], strategy: MAX, score: 0, isHuman: false};

        mockScope.data.players = [p1,p2,p3];
        var numCards = 12;
    
        // test
        var result = mockScope.applyValidation(numCards);

        expect(result).toEqual(true);
    });

    it("can detect invalid numCards (too low)", function () {
        var MAX = "dummy";
        var p1 = {name: "You", hand: [1,8,4], strategy: MAX, score: 0, isHuman: true};
        var p2 = {name: "Van Halen", hand: [9,6,2], strategy: MAX, score: 0, isHuman: false};
        var p3 = {name: "Rhoads", hand: [3,7,10], strategy: MAX, score: 0, isHuman: false};

        mockScope.data.players = [p1,p2,p3];
        var numCards = 2;
    
        // test
        var result = mockScope.applyValidation(numCards);

        expect(result).toEqual(false);
    });

    it("can detect invalid numCards (uneven)", function () {
        var MAX = "dummy";
        var p1 = {name: "You", hand: [1,8,4], strategy: MAX, score: 0, isHuman: true};
        var p2 = {name: "Van Halen", hand: [9,6,2], strategy: MAX, score: 0, isHuman: false};
        var p3 = {name: "Rhoads", hand: [3,7,10], strategy: MAX, score: 0, isHuman: false};

        mockScope.data.players = [p1,p2,p3];
        var numCards = 15;
    
        // test
        var result = mockScope.applyValidation(numCards);

        expect(result).toEqual(false);
    });
});
