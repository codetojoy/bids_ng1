describe("Dealer Service Test", function () {
 
    let dealerService;
 
    beforeEach(angular.mock.module("bids"));
 
    beforeEach(angular.mock.inject(function (DealerService) { 
        dealerService = DealerService;
    }));

    // -------- tests

    it("can create deck", function () {
        const numCards = 10;
        const result = dealerService.createDeck(numCards);
        expect(result).toEqual([1,2,3,4,5,6,7,8,9,10]);
    });

    it("can shuffle deck", function () {
        const cards = [1,2,3,4,5,6,7,8,9,10];
        const result = dealerService.shuffle(cards);
        expect(result.length).toEqual(10);
        for (let i = 1; i <= 10; i++) {
            expect(result.indexOf(i) != -1).toEqual(true);
        }
    });

    it("can deal hands", function () {
        const numCardsInHand = 3;
        const numHands = 4;
        const cards = [1,2,3,4,5,6,7,8,9,10,11,12];
        const result = dealerService.dealHands(cards, numCardsInHand);
        expect(result.length).toEqual(numHands);
        for (let i = 0; i < numHands; i++) {
            expect(result[i].length).toEqual(numCardsInHand);
        }
    });
});
