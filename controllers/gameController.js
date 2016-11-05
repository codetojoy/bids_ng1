angular.module("bids")
.controller("gameController", function ($scope, $filter, DealerService, StrategyService) {
    const strategyService = StrategyService;
    const dealerService = DealerService;
 
    $scope.data.kitty = {hand: []};
    $scope.data.prizeCard = 0;
    $scope.data.statusMessage = "Press 'New Game' to play";

    $scope.deal = function () {
        const deck = dealerService.createDeck($scope.data.numCards);
        console.log("TRACER 09-OCT deal() :: numCards " + $scope.data.numCards);
        const shuffledDeck = dealerService.shuffle(deck);
        const hands = dealerService.dealHands(shuffledDeck, $scope.data.numCardsInHand);

        $scope.data.kitty.hand = hands[0];
        $scope.assignPrizeCard();

        for (let handIndex = 1; handIndex < hands.length; handIndex++) {
            const hand = hands[handIndex];
            const playerIndex = handIndex - 1;
            let player = $scope.data.players[playerIndex];
            player.hand = hand;
            player.score = 0;
        }

        $scope.data.statusMessage = "Your turn";
    }

    $scope.toggleIsTransparent = function () {
        const oldVal = $scope.data.isTransparent;
        $scope.data.isTransparent = ! oldVal;
    }

    $scope.playRound = function (humanBid) {
        const humanPlayer = $scope.findPlayerByName($scope.data.humanName, $scope.data.players);
        $scope.removeCardFromHand(humanBid, humanPlayer.hand);
        const prizeCard = $scope.data.prizeCard;

        const resultInfo = $scope.goAroundTableForBids($scope.data.players, humanBid, humanPlayer);
        const {highestBid, leader} = resultInfo;

        leader.score += prizeCard;
        $scope.data.statusMessage = `${leader.name} won prize (${prizeCard}) with bid: ${highestBid}`;

        $scope.updateTable();
    }

    $scope.processBid = function (player, prizeCard, prevInfo) {
        let resultInfo = prevInfo;

        if (! player.isHuman) {
            const bid = $scope.getBid(prizeCard, player);
            $scope.removeCardFromHand(bid, player.hand);

            if (bid > resultInfo.highestBid) {
                resultInfo = {highestBid: bid, leader: player};
            } 
        }

        return resultInfo;
    }

    $scope.goAroundTableForBids = function (players, openingBid, openingLeader) {
        let resultInfo = {highestBid: openingBid, leader: openingLeader};

        const prizeCard = $scope.data.prizeCard;

        resultInfo = players.reduce((prevInfo, player) =>
                        $scope.processBid(player, prizeCard, prevInfo), resultInfo);

        return resultInfo;
    }

    $scope.updateTable = function() {
        const isLastRound = ($scope.data.kitty.hand.length == 0);

        if (isLastRound) {
            const gameWinner = $scope.findPlayerByHighScore($scope.data.players);
            $scope.data.statusMessage += ` ... and ${gameWinner.name} wins the game!`; 
            $scope.data.prizeCard = 0;
        } else {
            $scope.assignPrizeCard();
        }
    }

    // TODO: find a home for these, such as a service etc

    $scope.removeCardFromHand = function (card, hand) {
        const index = hand.indexOf(card);

        if (index > -1) {
            newHand = hand.splice(index, 1);
        } 
    } 

    $scope.findPlayerByHighScore = function (players) {
        const filteredPlayers = $filter('orderBy')(players,"score",true);
        return filteredPlayers[0];
    }

    $scope.findPlayerByName = function (targetName, players) {
        const filteredPlayers = $filter('filter')(players,{name: targetName});
        return filteredPlayers[0];
    }

    $scope.getBid = function (prizeCard, player) {
        const strategy = strategyService.getStrategy(player.strategy);
        const bid = strategy(prizeCard, player.hand);
        return bid;
    }

    $scope.assignPrizeCard = function () {
        $scope.data.prizeCard = $scope.data.kitty.hand.pop();
    }
})
;
