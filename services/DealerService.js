angular.module('bids')
.service('DealerService', function () {
    this.dealHands = function (array,  numCardsInHand) {
        var hands = [];

        var i,j,temparray;

        for (i=0,j=array.length; i<j; i+= numCardsInHand) {
            temparray = array.slice(i,i+ numCardsInHand);
            hands.push(temparray);
        }

        return hands;
    }

    // http://stackoverflow.com/a/2450976/12704
    this.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    this.createDeck = function (numCards) {
        var deck = [];

        for (var i = 1; i <= numCards; i++) {
            deck.push(i);
        }

        return deck;
    }
});
