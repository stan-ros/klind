var app = angular.module('klindApp', []);
app.filter('micexClear', function(){
  return function(input, $scope, type, months){
      var years = months / 12;
      var minMicexCleared = Math.max($scope.MICEX_CLEARED_MIN, $scope.currentMicexCleared / Math.pow($scope.maxSpeedOfGrowth, years));
      var maxMicexCleared = Math.min($scope.MICEX_CLEARED_MAX, $scope.currentMicexCleared * Math.pow($scope.maxSpeedOfGrowth, years));
      /*we expect at two time more slowest growth than max*/
      var expectedMicexCleared =  Math.min(100, $scope.currentMicexCleared * Math.pow($scope.maxSpeedOfGrowth, years / 2)); 
      if (type == 'expected'){
          console.log('[MONTHES]'+months);
          console.log('[TYPE]'+type);
          
          console.log(minMicexCleared);
          console.log(maxMicexCleared);
          console.log(expectedMicexCleared);
      }
      switch (type){
          case 'min':
              var indexGrowth = minMicexCleared / $scope.currentMicexCleared * Math.pow(1 + $scope.M2_YEAR_GROWTH_MIN / 100 , years);
              break;
          case 'max':
              var indexGrowth = maxMicexCleared / $scope.currentMicexCleared * Math.pow(1 + $scope.M2_YEAR_GROWTH_MAX / 100, years); 
              break;
          case 'expected':
              var indexGrowth = expectedMicexCleared  / $scope.currentMicexCleared * Math.pow(1 + ($scope.M2_YEAR_GROWTH_MIN+$scope.M2_YEAR_GROWTH_MAX) / 200, years);
              break;
      }
      var money = $scope.moneyAmount + $scope.moneyAmount*$scope.allowedMultiplier * (indexGrowth-1);
      return money.toFixed(2);
  }  
});
app.controller('MicexClearedCtrl', function($scope) {
    $scope.firstMicex = 101.21;
    $scope.firstM2 = 363;
    $scope.lastMicex = 1475;
    $scope.lastM2 = 30245;
    /*we describe by 10% as money amount compress during crisis*/
    $scope.MICEX_CLEARED_MIN = Math.round(100*12.60 / 1.1)/100;
    $scope.MICEX_CLEARED_MAX = 120;
    $scope.M2_YEAR_GROWTH_MIN = 10;
    $scope.M2_YEAR_GROWTH_MAX = 20;
    $scope.moneyAmount = 10;
    /*2 mean for one year MicexClearedIndex can be multiple by 2 at max */
    $scope.maxSpeedOfGrowth = 2;
    $scope.updateValues = function() {
        $scope.currentMicexCleared = 100 * $scope.lastMicex / $scope.lastM2 / ($scope.firstMicex / $scope.firstM2);
        $scope.allowedMultiplier = 1 / (1.15 - Math.min(1, $scope.MICEX_CLEARED_MIN / $scope.currentMicexCleared));
    };
    $scope.updateValues();
});