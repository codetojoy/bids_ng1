describe("Controller Test", function () {
 
    var mockScope, gameController, mainController;
    var dealerService;
    var MIN, MAX;
 
    beforeEach(angular.mock.module("bids"));
 
    beforeEach(angular.mock.inject(function ($controller, $rootScope, DealerService, StrategyService) { 
        mockScope = $rootScope.$new();
        mainController = $controller("mainController", {
            $scope: mockScope
        });
        gameController = $controller("gameController", {
            $scope: mockScope
        });
        dealerService = DealerService;
        MAX = StrategyService.MAX;
        MIN = StrategyService.MIN;
    }));

    // -------- tests

    it("has # cards [canary]", function () {
        expect(mockScope.data.numCards).toEqual(30);
    });

    it("can find player by name", function () {
        var p1 = {name: "You", hand: [1,8,4], strategy: MAX, score: 0, isHuman: true};
        var p2 = {name: "Van Halen", hand: [9,6,2], strategy: MAX, score: 0, isHuman: false};
        var p3 = {name: "Rhoads", hand: [3,7,10], strategy: MAX, score: 0, isHuman: false};

        var players = [p1,p2,p3];
        var targetName = "Rhoads";

        // test
        var result = mockScope.findPlayerByName(targetName, players);

        expect(result.name).toEqual(targetName);
    });

    it("can find player by high score", function () {
        var p1 = {name: "You", hand: [1,8,4], strategy: MAX, score: 0, isHuman: true};
        var p2 = {name: "Van Halen", hand: [9,6,2], strategy: MAX, score: 50, isHuman: false};
        var p3 = {name: "Rhoads", hand: [3,7,10], strategy: MAX, score: 20, isHuman: false};

        var players = [p1,p2,p3];

        // test
        var result = mockScope.findPlayerByHighScore(players);

        expect(result.name).toEqual("Van Halen");
    });

    it("can play round", function () {
        var humanBid = 1;
        var p1 = {name: "You", hand: [1,8,4], strategy: MAX, score: 0, isHuman: true};
        var p2 = {name: "Xyz", hand: [9,6,2], strategy: MAX, score: 0, isHuman: false};
        var p3 = {name: "Ijk", hand: [3,7,10], strategy: MAX, score: 0, isHuman: false};

        mockScope.data.players = [p1,p2,p3];
        mockScope.data.prizeCard = 5;

        // test
        mockScope.playRound(humanBid);

        expect(mockScope.data.players[0].score).toEqual(0);
        expect(mockScope.data.players[1].score).toEqual(0);
        expect(mockScope.data.players[2].score).toEqual(5);

        expect(mockScope.data.players[0].hand).toEqual([8,4]);
        expect(mockScope.data.players[1].hand).toEqual([6,2]);
        expect(mockScope.data.players[2].hand).toEqual([3,7]);

    });

    it("can get bid", function () {
        var prizeCard = 6;
        var hand = [8,10,5,4,2];
        var player = {hand: hand, strategy: MAX};
        var result = mockScope.getBid(prizeCard, player);
        expect(result).toEqual(10);
    });
});
