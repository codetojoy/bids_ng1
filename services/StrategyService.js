angular.module('bids')
.constant("MAX", "MAX")
.constant("MIN", "MIN")
.service('StrategyService', function (MAX, MIN) {

    this.MAX = MAX;
    this.MIN = MIN;

    this.maxStrategy = function(prizeCard, hand) {
        var result = Math.max.apply(Math, hand);
        return result;
    }

    this.minStrategy = function(prizeCard, hand) {
        var result = Math.min.apply(Math, hand);
        return result;
    }

    this.map = {"MAX": this.maxStrategy, "MIN": this.minStrategy};

    this.getStrategy = function(type) {
        var result = this.map[type];
        return result;
    }
});
