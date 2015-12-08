angular.module('df.shell')
  .directive('dfMainMenu', function(){
    var directive = {
      scope: {
        menuLayout: '@'
      },
      templateUrl: 'src/df-main-menu/df-main-menu.html',
      controller: ['$scope', '$state', 'dfMainMenu', 'dfSidenav', function($scope, $state, dfMainMenu, dfSidenav){
        $scope.state = $state;

        $scope.getItems = function(){
          return dfMainMenu.getItems();
        };

        $scope.goToState = function(state){
          //leftSidenav.hide();
          //$state.go(state);
        }

        $scope.isActive = function(menuItem){
          var result = false;

          if (menuItem.action && menuItem.action.state && $state.includes(menuItem.action.state))
            result = true;

          return result;
        }
      }]
    }

    return directive;
  });
