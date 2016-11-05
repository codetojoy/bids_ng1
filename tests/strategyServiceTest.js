describe("Strategy Service Test", function () {
 
    let strategyService;
 
    beforeEach(angular.mock.module("bids"));
 
    beforeEach(angular.mock.inject(function (StrategyService) { 
        strategyService = StrategyService;
    }));

    // -------- tests

    it("can use nearest strategy", function () {
        const prizeCard = 6;
        const hand = [8,10,5,1,2];
        const strategy = strategyService.getStrategy(strategyService.NEAREST);

        // test
        const result = strategy(prizeCard, hand);

        expect(result).toEqual(5);
    });

    it("can use max strategy", function () {
        const prizeCard = 6;
        const hand = [8,10,5,4,2];
        const strategy = strategyService.getStrategy(strategyService.MAX);

        // test
        const result = strategy(prizeCard, hand);

        expect(result).toEqual(10);
    });

    it("can use min strategy", function () {
        const prizeCard = 6;
        const hand = [8,10,5,4,2];
        const strategy = strategyService.getStrategy(strategyService.MIN);

        // test
        const result = strategy(prizeCard, hand);

        expect(result).toEqual(2);
    });
});
