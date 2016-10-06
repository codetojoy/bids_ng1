describe("Strategy Service Test", function () {
 
    var strategyService;
 
    beforeEach(angular.mock.module("bids"));
 
    beforeEach(angular.mock.inject(function (StrategyService) { 
        strategyService = StrategyService;
    }));

    // -------- tests

    it("can use nearest strategy", function () {
        var prizeCard = 6;
        var hand = [8,10,5,1,2];
        var strategy = strategyService.getStrategy(strategyService.NEAREST);

        // test
        var result = strategy(prizeCard, hand);

        expect(result).toEqual(5);
    });

    it("can use max strategy", function () {
        var prizeCard = 6;
        var hand = [8,10,5,4,2];
        var strategy = strategyService.getStrategy(strategyService.MAX);

        // test
        var result = strategy(prizeCard, hand);

        expect(result).toEqual(10);
    });

    it("can use min strategy", function () {
        var prizeCard = 6;
        var hand = [8,10,5,4,2];
        var strategy = strategyService.getStrategy(strategyService.MIN);

        // test
        var result = strategy(prizeCard, hand);

        expect(result).toEqual(2);
    });
});
