angular.module('df.shell', ['ngMaterial']);
angular.module('df.shell')
  .provider('dfAuth', function(){

    var auth = {
      currentUser: null,
      login: function (email, pass) {
          this.currentUser = {nomeCurto: email.split('@')[0], roles: ['admin']};
      },
      logout: function () {
        this.currentUser = null;
      },
      createAccount: function () {

      },
      getRoles: function () {
        return this.currentUser ? this.currentUser.roles : [];
      },
      hasRole: function(roles){
        var result = false;
        var self = this;

        if (roles && self.currentUser && self.currentUser.roles) {
          if (roles.constructor === Array){
            result = _.intersection(roles, self.currentUser.roles).length > 0;
          } else {
            result = self.currentUser.roles.indexOf(roles) >= 0;
          }
        }

        return result;
      }
    };

    this.$get = function() {
      return auth;
    };

  });

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

angular.module('df.shell')
  .provider('dfMainMenu', ['dfAuthProvider', function(dfAuthProvider){
    var items = [];

    var auth = dfAuthProvider.$get();

    function filterItem(){
      return function(item){
        if (!item.roles || item.roles.length === 0)
          return true;

        var comunRoles = _.intersection(item.roles, auth.getRoles());
        return comunRoles && comunRoles.length > 0;
      }
    }

    this.addItem = function(item){
      items.push(item);
    }

    var mainMenu = {
      getItems: function(){
        return items.filter(filterItem());
      }
    };

    this.$get = function() {
      return mainMenu;
    };

  }]);

angular.module('df.shell')
    .factory('dfNotify', ['$mdToast', function($mdToast){

        var notify = {
            show: function(msg){
                var toast = $mdToast
                    .simple()
                    .textContent(msg);

                $mdToast.show(toast);
            }
        };

        return notify;
    }]);


angular.module('df.shell').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/df-button/df-button.html',
    "<div layout=\"column\">\r" +
    "\n" +
    "    <md-button class=\"{{getClasses()}}\" ng-click=\"doAction(action)\" aria-label=\"caption\" ng-show=\"isOnMedia(media)\" flex>\r" +
    "\n" +
    "        <md-tooltip md-direction=\"bottom\">{{caption}}</md-tooltip>\r" +
    "\n" +
    "        <span ng-show=\"showCaption(dfClass, caption)\">{{caption}}</span>\r" +
    "\n" +
    "        <md-icon ng-show=\"showIcon(dfClass, icon)\" md-svg-icon=\"{{icon}}\"></md-icon>\r" +
    "\n" +
    "    </md-button>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('src/df-float-actions/df-float-actions.html',
    "<div class=\"df-float-actions-container\">\r" +
    "\n" +
    "  <div layout=\"row\" layout-align=\"end end\">\r" +
    "\n" +
    "    <div layout=\"column\" class=\"df-float-actions\">\r" +
    "\n" +
    "      <df-button df-class=\"item.class || 'md-fab md-accent md-hue-2'\" caption=\"item.caption\" icon=\"item.icon\" action=\"item.action\" ng-repeat=\"item in buttons\">\r" +
    "\n" +
    "      </df-button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('src/df-main-menu/df-main-menu.html',
    "<div layout=\"{{menuLayout}}\">\r" +
    "\n" +
    "  <df-button caption=\"item.caption\" action=\"item.action\" ng-repeat=\"item in getItems()\" hide-df-sidenavs=\"true\" active-class=\"'md-primary md-raised md-hue-1'\" active=\"isActive(item)\"></df-button>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('src/df-sidenav/df-sidenav.html',
    "<div layout=\"column\">\r" +
    "\n" +
    "    <md-sidenav class=\"md-whiteframe-z2\" ng-class=\"{'md-sidenav-left': side !== 'right', 'md-sidenav-right': side === 'right'}\" md-component-id=\"getComponentId()\" md-is-open=\"dfSidenav.showSidenav[side]\" md-is-locked-open=\"isFixed()\" flex>\r" +
    "\n" +
    "        <div ng-include=\"partialOnSmall\" ng-if=\"partialOnSmall && isOnMedia(smallMedias)\"></div>\r" +
    "\n" +
    "        <div ng-include=\"partialOnLarge\" ng-if=\"partialOnLarge && isOnMedia(largeMedias)\"></div>\r" +
    "\n" +
    "    </md-sidenav>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('src/df-toolbar/df-toolbar-button.html',
    "<md-button class=\"md-icon-button\" aria-label=\"{{src.title}}\">\r" +
    "\n" +
    "    <md-icon md-svg-icon=\"{{src.icon}}\"></md-icon>\r" +
    "\n" +
    "</md-button>"
  );


  $templateCache.put('src/df-toolbar/df-toolbar.html',
    "<div layout=\"row\">\r" +
    "\n" +
    "        <df-button\r" +
    "\n" +
    "                df-class=\"btn.class || 'md-icon-button'\"\r" +
    "\n" +
    "                caption=\"btn.caption\" action=\"btn.action\"\r" +
    "\n" +
    "                icon=\"btn.icon\" media=\"btn.media\"\r" +
    "\n" +
    "                ng-repeat=\"btn in buttons\">\r" +
    "\n" +
    "        </df-button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('src/df-topbar/df-topbar.html',
    "<md-toolbar class=\"md-primary md-whiteframe-z2\">\r" +
    "\n" +
    "    <div class=\"md-toolbar-tools\">\r" +
    "\n" +
    "        <df-toolbar buttons=\"leftButtons\"></df-toolbar>\r" +
    "\n" +
    "        <img class=\"app-logo-gt-sm\" ng-src=\"{{logoGtSm}}\" ng-if=\"logoGtSm\" hide show-gt-sm>\r" +
    "\n" +
    "        <img class=\"app-logo-sm\" ng-src=\"{{logoSm || logoGtSm}}\" ng-if=\"logoSm || logoGtSm\" hide show-sm>\r" +
    "\n" +
    "        <span ng-if=\"!(logoSm || logoGtSm)\">{{caption}}</span>\r" +
    "\n" +
    "        <df-main-menu layout=\"row\" ng-if=\"isOnMedia(showMenuOnMedia)\"></df-main-menu>\r" +
    "\n" +
    "        <div layout=\"row\" ng-transclude>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <span flex></span>\r" +
    "\n" +
    "        <df-toolbar buttons=\"rightButtons\"></df-toolbar>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</md-toolbar>"
  );

}]);

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
angular.module('df.shell')
    .factory('dfSidenav', ['$mdSidenav', function($mdSidenav){

        var sidenav = {
            sides: ['left', 'right'],
            showSidenav: [],
            setup: function(){
                var self = this;

                this.sides.forEach(function(side){
                    self.showSidenav[side] = false;
                });
            },
            toggle: function(side){
                this.showSidenav[side] = !this.showSidenav[side];
            },
            hideAll: function(){
                var self = this;

                this.sides.forEach(function(side){
                    self.showSidenav[side] = false;
                });
            }

    };

        sidenav.setup();

        return sidenav;
    }]);


angular.module('df.shell').
    directive('dfToolbarButton', function() {
        var button = {
            scope: {
                src: '='
            },
            templateUrl: 'df-shell/df-toolbar/df-toolbar-button.html'
        }
        return button;
    });
angular.module('df.shell').
    directive('dfToolbar', function() {
        var topbar = {
            scope: {
                buttons: '='
            },
            templateUrl: 'src/df-toolbar/df-toolbar.html'
        }
        return topbar;
    });
angular.module('df.shell').
    directive('dfTopbar', function() {
        var topbar = {
            restrict: 'E',
            transclude: true,
            scope: {
              caption: '=',
              leftButtons: '=',
              rightButtons: '=',
              showMenuOnMedia: '=',
              logoSm: '=',
              logoGtSm: '='
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