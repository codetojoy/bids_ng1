angular.module("bids", ["ngRoute"])
.config(function ($routeProvider) {

    $routeProvider.when("/config", {
        templateUrl: "views/config/configMain.html"
    });

    $routeProvider.when("/game", {
        templateUrl: "views/gameMain.html"
    });

    $routeProvider.otherwise({
        templateUrl: "views/gameMain.html"
    });
});
