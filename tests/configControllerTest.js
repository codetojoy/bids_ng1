describe("Config Controller Test", function () {
 
    let mockScope, configController, mainController;
    let strategyService;
 
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
        const MAX = "dummy";
        let p1 = new Player("You", true, MAX, [1,8,4]);
        let p2 = new Player("Van Halen", false, MAX, [9,6,2]);
        let p3 = new Player("Rhoads", false, MAX, [3,7,10]);

        mockScope.data.players = [p1,p2,p3];
        const numCards = 12;
    
        // test
        const result = mockScope.applyValidation(numCards);

        expect(result).toEqual(true);
    });

    it("can detect invalid numCards (too low)", function () {
        const MAX = "dummy";
        let p1 = new Player("You", true, MAX, [1,8,4]);
        let p2 = new Player("Van Halen", false, MAX, [9,6,2]);
        let p3 = new Player("Rhoads", false, MAX, [3,7,10]);

        mockScope.data.players = [p1,p2,p3];
        const numCards = 2;
    
        // test
        const result = mockScope.applyValidation(numCards);

        expect(result).toEqual(false);
    });

    it("can detect invalid numCards (uneven)", function () {
        const MAX = "dummy";
        let p1 = new Player("You", true, MAX, [1,8,4]);
        let p2 = new Player("Van Halen", false, MAX, [9,6,2]);
        let p3 = new Player("Rhoads", false, MAX, [3,7,10]);

        mockScope.data.players = [p1,p2,p3];
        const numCards = 15;
    
        // test
        const result = mockScope.applyValidation(numCards);

        expect(result).toEqual(false);
    });
});
