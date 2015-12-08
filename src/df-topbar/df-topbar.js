angular.module('df.shell').
    directive('dfTopbar', function() {
        var topbar = {
            restrict: 'E',
            transclude: true,
            scope: {
              caption: '=',
              leftButtons: '=',
              rightButtons: '=',
              showMenuOnMedia: '='
            },
            templateUrl: 'src/df-topbar/df-topbar.html',
            controller: ['$scope', '$mdMedia', function($scope, $mdMedia) {
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
            }]
        }
        return topbar;
    });