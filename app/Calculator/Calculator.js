'use strict';

angular.module('myApp.Calculator', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Calculator', {
    templateUrl: '/app/Calculator/Calculator.html',
    controller: 'CalculatorController'
  });
}])
.directive('shortcut', function() {
      return {
        restrict: 'E',
        replace: true,
        scope: true,
        link:    function postLink(scope, iElement, iAttrs){
          jQuery(window ).on('keypress', function(e){
            scope.$apply(scope.keyPressed(e));
          });
        }
      };
    })
.controller('CalculatorController', ["$scope", "$document", function($scope, $document) {
      $scope.calculationItems = [];
      $scope.result = null;
      $scope.numberMode = true;

      $scope.addItem = function(item){
          $scope.calculationItems.push(item);

          if (item == '+' || item == '-'){
            $scope.numberMode = true;
          } else {
            $scope.numberMode = false;
          }
      };

      $scope.reset = function(){
          $scope.calculationItems = [];
          $scope.result = null;
          $scope.numberMode = true;
      };

      $scope.calculateResult = function(){
          $scope.result = 0;

          var addMode = true;

          angular.forEach($scope.calculationItems, function(item){
              if (item === '+'){
                addMode = true;
              } else if (item === '-'){
                addMode = false;
              } else {
                var number = parseInt(item);
                if (addMode){
                  $scope.result += number;
                } else {
                  $scope.result -= number;
                }
              }
          });
      };

      $scope.keyPressed = function(e) {
        switch (e.keyCode){
          case 49:
              $scope.addItem("1");
                break;
          case 50:
            $scope.addItem("2");
            break;
          case 51:
            $scope.addItem("3");
            break;
          case 52:
            $scope.addItem("4");
            break;
          case 53:
            $scope.addItem("5");
            break;
          case 54:
            $scope.addItem("6");
            break;
          case 55:
            $scope.addItem("7");
            break;
          case 56:
            $scope.addItem("8");
            break;
          case 57:
            $scope.addItem("9");
            break;
          case 48:
            $scope.addItem("0");
            break;

          case 43:
            $scope.addItem("+");
            break;
          case 45:
            $scope.addItem("-");
            break;
          case 61:
            $scope.calculateResult();
            break;
        };
      };
}]);