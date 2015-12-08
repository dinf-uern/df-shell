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

