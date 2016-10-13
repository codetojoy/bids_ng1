angular.module("bids")
.constant("defaultNumCards", 30)
.constant("defaultNumPlayers", 4)
.constant("humanName", "You")
.controller("mainController", function ($scope, $location, defaultNumCards, defaultNumPlayers, humanName, StrategyService) {

    var MAX = StrategyService.MAX;
    var MIN = StrategyService.MIN;
    var NEAREST = StrategyService.NEAREST;

    $scope.data = {
        MAX: StrategyService.MAX,
        MIN: StrategyService.MIN,
        NEAREST: StrategyService.NEAREST,

        numCards: defaultNumCards,
        numPlayers: defaultNumPlayers,
        humanName: humanName,

        // TODO: error validation
        numCardsInHand: (defaultNumCards / (defaultNumPlayers + 1)),

        players: [
            {name: humanName, hand: [], score: 0, isHuman: true, strategy: "" },
            {name: "Beethoven", hand: [], score: 0, isHuman: false, strategy: MIN },
            {name: "Chopin", hand: [], score: 0, isHuman: false, strategy: MAX },
            {name: "Mozart", hand: [], score: 0, isHuman: false, strategy: NEAREST }
        ],
        isTransparent: false
    };

    $scope.changeNumCards = function () {
        console.log("TRACER change num cards");
        var numCards = $scope.data.numCards;
        var numPlayers = $scope.data.numPlayers;
        $scope.data.numCardsInHand = (numCards / (numPlayers + 1));
    }

    $scope.goNext = function (hash) {
        $location.path(hash);
    }
});
