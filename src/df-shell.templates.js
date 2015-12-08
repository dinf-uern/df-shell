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
    "<div class=\"df-float-actions-container\">\n" +
    "  <div layout=\"row\" layout-align=\"end end\">\n" +
    "    <div layout=\"column\" class=\"df-float-actions\">\n" +
    "      <df-button df-class=\"item.class || 'md-fab md-accent md-hue-2'\" caption=\"item.caption\" icon=\"item.icon\" action=\"item.action\" ng-repeat=\"item in buttons\">\n" +
    "      </df-button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('src/df-main-menu/df-main-menu.html',
    "<div layout=\"{{menuLayout}}\">\n" +
    "  <df-button caption=\"item.caption\" action=\"item.action\" ng-repeat=\"item in getItems()\" hide-df-sidenavs=\"true\" active-class=\"'md-accent md-hue-1'\" active=\"isActive(item)\"></df-button>\n" +
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
    "<df-button\r" +
    "\n" +
    "        df-class=\"btn.class || 'md-icon-button'\"\r" +
    "\n" +
    "        caption=\"btn.caption\" action=\"btn.action\"\r" +
    "\n" +
    "        icon=\"btn.icon\" media=\"btn.media\"\r" +
    "\n" +
    "        ng-repeat=\"btn in buttons\">\r" +
    "\n" +
    "</df-button>\r" +
    "\n"
  );


  $templateCache.put('src/df-topbar/df-topbar.html',
    "<md-toolbar class=\"md-primary md-whiteframe-z2\">\r" +
    "\n" +
    "    <div class=\"md-toolbar-tools\">\r" +
    "\n" +
    "        <df-toolbar buttons=\"leftButtons\"></df-toolbar>\r" +
    "\n" +
    "        <span>{{caption}}</span>\r" +
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
