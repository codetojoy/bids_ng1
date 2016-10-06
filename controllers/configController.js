angular.module("bids")
.controller("configController", function ($scope, $filter, $location, StrategyService) {

    $scope.goNext = function (hash) {
        $location.path(hash);
    }
})
;
