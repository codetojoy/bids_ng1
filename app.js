angular.module("bids", ["ngRoute"])
.config(function ($routeProvider) {
    $routeProvider.otherwise({
        templateUrl: "views/gameMain.html"
    });
});
