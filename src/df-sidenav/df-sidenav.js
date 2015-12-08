angular.module('df.shell').
    directive('dfSidenav', function() {
        var navbar = {
            replace: true,
            scope: {
                side: '@',
                smallMedias: '=',
                largeMedias: '=',
                partialOnSmall: '=',
                partialOnLarge: '=',
                fixedOnSmall: '=',
                fixedOnLarge: '='
            },
            templateUrl: 'src/df-sidenav/df-sidenav.html',
            controller: ['$scope', '$mdMedia', 'dfSidenav', function($scope, $mdMedia, dfSidenav){

                $scope.dfSidenav = dfSidenav;

                var isOnMedia = $scope.isOnMedia = function(media){
                    var result = false;

                    if (media) {
                        if (media.constructor === Array){
                            result = _.reduce(media, function(condition, value){
                                return condition || $mdMedia(value);
                            }, false);
                        } else {
                            result = $mdMedia(media);
                        }
                    }

                    return result;
                }

                $scope.isFixed = function(){
                    return isOnMedia($scope.smallMedias) && $scope.fixedOnSmall || isOnMedia($scope.largeMedias) && $scope.fixedOnLarge;
                }

                $scope.getComponentId = function(){
                    return $scope.side;
                }
            }]
        }
        return navbar;
    });