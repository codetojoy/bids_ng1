angular.module("bids")
.constant("numCards", 30)
.constant("numPlayers", 4)
.constant("humanName", "You")
.controller("mainController", function ($scope, numCards, numPlayers, humanName, StrategyService) {

    var strategyService = StrategyService;
    var MAX = strategyService.MAX;
    var MIN = strategyService.MIN;
    var NEAREST = strategyService.NEAREST;

    $scope.data = {
        numCards: numCards,
        numPlayers: numPlayers,
        humanName: humanName,

        // TODO: error validation
        numCardsInHand: (numCards / (numPlayers + 1)),

        players: [
            {name: humanName, hand: [], score: 0, isHuman: true, strategy: "" },
            {name: "Beethoven", hand: [], score: 0, isHuman: false, strategy: MIN },
            {name: "Chopin", hand: [], score: 0, isHuman: false, strategy: MAX },
            {name: "Mozart", hand: [], score: 0, isHuman: false, strategy: NEAREST }
        ],
        isTransparent: false
    };
})
;
