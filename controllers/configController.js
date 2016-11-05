angular.module("bids")
.controller("configController", function ($scope, $filter, StrategyService) {

    $scope.applyValidation = function (newNumCards) {
        const numHands = $scope.data.players.length + 1;
        const checkEvenDistribution = ((newNumCards % numHands) === 0);
        const checkMinimum = (newNumCards >= numHands);
        const isValid = checkEvenDistribution && checkMinimum;

        $scope.showValidation = (! isValid);
        // myForm.isValid = false;

        return isValid;
    }

    $scope.getError = function (error) {
        const numHands = $scope.data.players.length + 1;
        return "numCards must be greater than " + numHands + " and evenly divisible by " + numHands;
    }

    // TODO: experimental
    $scope.addPlayer = function () {
        const player = {name: "Vivaldi", hand: [], score: 0, isHuman: false, strategy: $scope.data.MIN };
        $scope.data.players.push(player);
    }
})
.directive('validatenumcards', function (){ 
   return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elem, attr, ngModel) {

          let checkValidation = function (value) {
              return scope.applyValidation(value);
          }
          
          // DOM -> model validation
          ngModel.$parsers.unshift(function(value) {
              const isValid = checkValidation(value);
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
