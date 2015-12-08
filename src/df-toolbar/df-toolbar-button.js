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