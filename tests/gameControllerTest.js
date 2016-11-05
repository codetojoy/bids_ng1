describe("Game Controller Test", function () {
 
    let mockScope, gameController, mainController;
    let dealerService;
    let MIN, MAX;
 
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
        const p1 = new Player("You", true, MAX, [1,8,4]);
        const p2 = new Player("Van Halen", false, MAX, [9,6,2]);
        const p3 = new Player("Rhoads", false, MAX, [3,7,10]);

        const players = [p1,p2,p3];
        const targetName = "Rhoads";

        // test
        const result = mockScope.findPlayerByName(targetName, players);

        expect(result.name).toEqual(targetName);
    });

    it("can find player by high score", function () {
        const p1 = new Player("You", true, MAX, [1,8,4], 0);
        const p2 = new Player("Van Halen", false, MAX, [9,6,2], 50);
        const p3 = new Player("Rhoads", false, MAX, [3,7,10], 20);

        const players = [p1,p2,p3];

        // test
        const result = mockScope.findPlayerByHighScore(players);

        expect(result.name).toEqual("Van Halen");
    });

    it("can play round", function () {
        const humanBid = 1;
        const p1 = new Player("You", true, MAX, [1,8,4]);
        const p2 = new Player("Van Halen", false, MAX, [9,6,2]);
        const p3 = new Player("Rhoads", false, MAX, [3,7,10]);

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
        const prizeCard = 6;
        const hand = [8,10,5,4,2];
        let player = new Player("Ginger", false, MAX, hand);
        const result = mockScope.getBid(prizeCard, player);
        expect(result).toEqual(10);
    });
});
