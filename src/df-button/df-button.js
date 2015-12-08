angular.module('df.shell').
    directive('dfButton', function() {
        var button = {
            scope: {
                caption: '=',
                icon: '=',
                media: '=',
                action: '=',    //function
                activeClass: '=',
                active: '=',
                dfClass: '=',   //base class
                hideDfSidenavs: '='
            },
            templateUrl: 'src/df-button/df-button.html',
            controller: ['$rootScope', '$scope', '$state', '$mdMedia', '$window', 'dfSidenav', function($rootScope, $scope, $state, $mdMedia, $window, dfSidenav){

                $scope.isOnMedia = function(media){
                    var result = true;

                    if (media) {
                        if (media.constructor === Array) {
                            result = _.reduce(media, function(condition, value){
                                return condition || $mdMedia(value);
                            }, false);
                        } else {
                            result = $mdMedia(media);
                        }
                    }

                    return result;
                }

                //TODO: implementar doAction
                $scope.doAction = function(action){
                    if ($scope.hideDfSidenavs)
                        dfSidenav.hideAll();

                    if (action) {
                        if (action.state) {
                            if (action.params){
                                $state.go(action.state, action.params);
                            } else {
                                $state.go(action.state);
                            }
                        }

                        if (action.event)
                            $rootScope.$broadcast(action.event);

                        if (action.exec)
                            action.exec();

                        if (action.link)
                            $window.open(action.link, action.target);
                    } else {
                        throw new Error('nenhuma ação foi definida!');
                    }
                }

                function isIconicButton(btnClass){
                    return _.intersection(btnClass.split(' '), ['md-fab', 'md-icon-button']).length > 0;
                }

                $scope.showCaption = function(btnClass, caption){
                    return !(btnClass && isIconicButton(btnClass)) && caption;
                }

                $scope.showIcon = function(btnClass, icon){
                    return (btnClass && isIconicButton(btnClass)) && icon;
                }

                $scope.getClasses = function(){
                    var classes = [];

                    classes.push($scope.dfClass);

                    if ($scope.activeClass && $scope.active)
                        classes.push($scope.activeClass);

                    return classes.join(' ');
                }
            }]
        }

        return button;
    });
