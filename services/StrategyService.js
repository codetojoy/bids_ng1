angular.module('bids')
.constant("MAX", "MAX")
.constant("MIN", "MIN")
.constant("NEAREST", "NEAREST")
.constant("LARGE_VALUE", "10000")
.service('StrategyService', function (MAX, MIN, NEAREST, LARGE_VALUE) {

    this.MAX = MAX;
    this.MIN = MIN;
    this.NEAREST = NEAREST;

    this.LARGE_VALUE = LARGE_VALUE;

    this.maxStrategy = function (prizeCard, hand) {
        const result = Math.max.apply(Math, hand);
        return result;
    }

    this.minStrategy = function (prizeCard, hand) {
        const result = Math.min.apply(Math, hand);
        return result;
    }

    var evalNearest = function (prevInfo, thisCard, prizeCard) {
        let resultInfo = prevInfo;
        
        const thisDistance = Math.abs(thisCard - prizeCard);
        if (thisDistance < prevInfo.distance) {
            resultInfo = {distance: thisDistance, nearestCard: thisCard};
        }

        return resultInfo;
    }

    this.nearestStrategy = function (prizeCard, hand) {
        const result = hand.reduce((prevInfo, card) => 
                        evalNearest(prevInfo, card, prizeCard), 
                        {distance: LARGE_VALUE})
                        .nearestCard;
        return result;
    }

    this.map = {"MAX": this.maxStrategy, 
                "MIN": this.minStrategy,
                "NEAREST": this.nearestStrategy};

    this.getStrategy = function(type) {
        var result = this.map[type];
        return result;
    }
});
