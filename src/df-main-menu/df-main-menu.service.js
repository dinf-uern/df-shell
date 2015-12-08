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
