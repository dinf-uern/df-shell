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

