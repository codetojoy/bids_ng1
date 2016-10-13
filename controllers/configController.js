angular.module("bids")
.controller("configController", function ($scope, $filter, StrategyService) {

    $scope.applyValidation = function (newNumCards) {
        var numHands = $scope.data.players.length + 1;
        var checkEvenDistribution = ((newNumCards % numHands) === 0);
        var checkMinimum = (newNumCards >= numHands);
        var isValid = checkEvenDistribution && checkMinimum;

        $scope.showValidation = (! isValid);
        // myForm.isValid = false;

        return isValid;
    }

    $scope.getError = function (error) {
        var numHands = $scope.data.players.length + 1;
        return "numCards must be greater than " + numHands + " and evenly divisible by " + numHands;
    }

    // TODO: experimental
    $scope.addPlayer = function () {
        var player = {name: "Vivaldi", hand: [], score: 0, isHuman: false, strategy: $scope.data.MIN };
        $scope.data.players.push(player);
    }
})
.directive('validatenumcards', function (){ 
   return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elem, attr, ngModel) {

          var checkValidation = function (value) {
              return scope.applyValidation(value);
          }
          
          // DOM -> model validation
          ngModel.$parsers.unshift(function(value) {
              var isValid = checkValidation(value);
              ngModel.$setValidity('validatenumcards', isValid);
              return isValid ? value : undefined;
          });

          // model -> DOM validation
          ngModel.$formatters.unshift(function(value) {
              ngModel.$setValidity('validatenumcards', checkValidation(value));
              return value;
          });
      }
   };
})
;
