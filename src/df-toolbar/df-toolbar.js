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