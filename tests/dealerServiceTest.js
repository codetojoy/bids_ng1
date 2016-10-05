describe("Dealer Service Test", function () {
 
    var dealerService;
 
    beforeEach(angular.mock.module("bids"));
 
    beforeEach(angular.mock.inject(function (DealerService) { 
        dealerService = DealerService;
    }));

    // -------- tests

    it("can create deck", function () {
        var numCards = 10;
        var result = dealerService.createDeck(numCards);
        expect(result).toEqual([1,2,3,4,5,6,7,8,9,10]);
    });

    it("can shuffle deck", function () {
        var cards = [1,2,3,4,5,6,7,8,9,10];
        var result = dealerService.shuffle(cards);
        expect(result.length).toEqual(10);
        for (var i = 1; i <= 10; i++) {
            expect(result.indexOf(i) != -1).toEqual(true);
        }
    });

    it("can deal hands", function () {
        var numCardsInHand = 3;
        var numHands = 4;
        var cards = [1,2,3,4,5,6,7,8,9,10,11,12];
        var result = dealerService.dealHands(cards, numCardsInHand);
        expect(result.length).toEqual(numHands);
        for (var i = 0; i < numHands; i++) {
            expect(result[i].length).toEqual(numCardsInHand);
        }
    });
});
