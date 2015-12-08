angular.module('df.shell')
  .directive('dfFloatActions', function(){
    var directive = {
      scope: {
        buttons: '='
      },
      templateUrl: 'src/df-float-actions/df-float-actions.html',
      controller: ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state){

      }]
    }

    return directive;
  });
