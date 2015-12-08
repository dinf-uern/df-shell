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
