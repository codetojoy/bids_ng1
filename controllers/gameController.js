angular.module("bids")
.controller("gameController", function ($scope, $filter, DealerService, StrategyService) {
    var strategyService = StrategyService;
    var dealerService = DealerService;
 
    $scope.data.kitty = {hand: []};
    $scope.data.prizeCard = 0;
    $scope.data.statusMessage = "Press 'New Game' to play";

    $scope.deal = function () {
        var deck = dealerService.createDeck($scope.data.numCards);
        console.log("TRACER 09-OCT deal() :: numCards " + $scope.data.numCards);
        var shuffledDeck = dealerService.shuffle(deck);
        var hands = dealerService.dealHands(shuffledDeck, $scope.data.numCardsInHand);

        $scope.data.kitty.hand = hands[0];
        $scope.assignPrizeCard();

        for (var handIndex = 1; handIndex < hands.length; handIndex++) {
            var hand = hands[handIndex];
            var playerIndex = handIndex - 1;
            var player = $scope.data.players[playerIndex];
            player.hand = hand;
            player.score = 0;
        }

        $scope.data.statusMessage = "Your turn";
    }

    $scope.toggleIsTransparent = function () {
        var oldVal = $scope.data.isTransparent;
        $scope.data.isTransparent = ! oldVal;
    }

    $scope.playRound = function (humanBid) {
        var humanPlayer = $scope.findPlayerByName($scope.data.humanName, $scope.data.players);
        $scope.removeCardFromHand(humanBid, humanPlayer.hand);
        var prizeCard = $scope.data.prizeCard;

        var resultInfo = $scope.goAroundTableForBids($scope.data.players, humanBid, humanPlayer);
        var highestBid = resultInfo.highestBid;
        var leader = resultInfo.leader;

        leader.score += prizeCard;
        $scope.data.statusMessage = leader.name + " won prize (" + prizeCard + ") with bid: " + highestBid;

        $scope.updateTable();
    }

    $scope.processBid = function (player, prizeCard, prevInfo) {
        var resultInfo = prevInfo;

        if (! player.isHuman) {
            var bid = $scope.getBid(prizeCard, player);
            $scope.removeCardFromHand(bid, player.hand);

            if (bid > resultInfo.highestBid) {
                resultInfo = {highestBid: bid, leader: player};
            } 
        }

        return resultInfo;
    }

    $scope.goAroundTableForBids = function (players, openingBid, openingLeader) {
        var resultInfo = {highestBid: openingBid, leader: openingLeader};

        var prizeCard = $scope.data.prizeCard;

        resultInfo = players.reduce((prevInfo, player) =>
                        $scope.processBid(player, prizeCard, prevInfo), resultInfo);

        return resultInfo;
    }

    $scope.updateTable = function() {
        var isLastRound = ($scope.data.kitty.hand.length == 0);

        if (isLastRound) {
            var gameWinner = $scope.findPlayerByHighScore($scope.data.players);
            $scope.data.statusMessage += " ... and " + gameWinner.name + " wins the game!"; 
            $scope.data.prizeCard = 0;
        } else {
            $scope.assignPrizeCard();
        }
    }

    // TODO: find a home for these, such as a service etc

    $scope.removeCardFromHand = function (card, hand) {
        var index = hand.indexOf(card);

        if (index > -1) {
            newHand = hand.splice(index, 1);
        } 
    } 

    $scope.findPlayerByHighScore = function (players) {
        var players = $filter('orderBy')(players,"score",true);
        return players[0];
    }

    $scope.findPlayerByName = function (targetName, players) {
        var players = $filter('filter')(players,{name: targetName});
        return players[0];
    }

    $scope.getBid = function (prizeCard, player) {
        var strategy = strategyService.getStrategy(player.strategy);
        var bid = strategy(prizeCard, player.hand);
        return bid;
    }

    $scope.assignPrizeCard = function () {
        $scope.data.prizeCard = $scope.data.kitty.hand.pop();
    }
})
;
