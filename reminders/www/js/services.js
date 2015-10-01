'use strict';

/* Services */

angular.module('service', [])


  /* DATA */

.factory('$data', function() {
  var data = {};
  return data;
})

/* PARSE FACTORY */
.factory('ParseService', function() {

    // Initialize Parse API
Parse.initialize("lGvFfn42wkkLHZJIjduI7ex6NFocDrxE1ZxmPG7b", "HgGeVwiMvuAUoRE9LtRQiVG5KWDk6fG7iPNoYren");

    // Cache Current User
    var loggedInUser;

    // Define Parse Models
    var Reminder = Parse.Object.extend("Reminder");

    var ParseService = {
      name: "Parse",

      /* USERS */

      // Login a user
      login : function login(username, password, callback) {
    	  Parse.User.logIn(username, password, {
    	    success: function(user) {
            loggedInUser = user;
    	      callback(user);
    	    },
    	    error: function(user, error) {
    	      alert("Error: " + error.message);
    	    }
        });
      },

      // Register a user
      signUp : function signUp(username, password, email, callback) {
      	Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
            success: function(user) {
                user.set("email", email);
                loggedInUser = user;
                callback(user);
            },
            error: function(user, error) {
              alert("Error: " + error.message);
            }
        });
      },

      // Get current logged in user
      getUser : function getUser() {
        // if(loggedInUser) {
        //   return loggedInUser;
        // }
        return Parse.User.current();
      },

      // Logout current user
      logout : function logout(callback) {
        Parse.User.logOut();
      },


      /* QUERIES */

      // Get All Nodes
      getReminders : function getReminders(callback) {
        var query = new Parse.Query(Reminder);
        query.find({
          success : function(results) {
            callback(results);
          },
          error : function(error) {
            alert("Error" + error.message);
          }
        });
      },

      // Create A New Node
      addReminder : function addReminder(_task, _category, _date, _alarm, callback) {
        console.log('TASK: ' + _task);
        console.log('CAT: ' + _category);
        console.log('DATE: ' + _date);
        console.log('ALARM: ' + _alarm);
          
        var yesno = false;
        if(_alarm === "yes")
            yesno = true;
        else
            yesno = false;

        var params = {
          title:_task,
          category:_category,
          time:_date,
          alarm:yesno
        };

        var object = new Reminder();
        object.save(params, {
          success: function(object) {
            callback();
          },
          error: function(error) {
            alert("Error: " + error.message);
          }
        });
      },

      // Add Favourite
      favouriteNode : function favouriteNode(_node, callback) {
        console.log('node is ' + _node.id);

        var params = {
          Node:_node,
          User:loggedInUser
        };

        var obj = new Fave();
        obj.save(params, {
          success: function(obj) {
            console.log('faved!');
            callback(obj);
          },
          error: function(error) {
            alert("Error: " + error.message);
          }
        });
      },

      // Update
      updateNode : function updateNode(_obj, _update, callback) {
        console.log('item is ' + _obj.id);
        console.log('update is ' + _update);

        // var obj = new Node();
        // obj.id = _obj.id;
        // obj.save(null, {
        //   success: function(obj) {
        //     //callback(obj);
        //   },
        //   error: function(error) {
        //     alert("Error: " + error.message);
        //   }
        // });
      },

      // Add Comment
      commentNode : function commentNode(_obj, _note, callback) {
        console.log('item is ' + _obj.id);
        console.log('note is ' + _note);

        var obj = new Node();
        obj.id = _obj.id;
        obj.addUnique('notes', _note);
        obj.save(null, {
          success: function(obj) {
            callback(obj);
          },
          error: function(error) {
            alert("Error: " + error.message);
          }
        });
      },

    };

    // The factory function returns ParseService, which is injected into controllers.
    return ParseService;
})

/* PHONEGAP FACTORIES */

.factory('phonegapReady', function() {
    return function (fn) {
        var queue = [];
        var impl = function () {
        queue.push(Array.prototype.slice.call(arguments));
    };

    document.addEventListener('deviceready', function () {
        queue.forEach(function (args) {
            fn.apply(this, args);
        });
        impl = fn;
    }, false);

    return function () {
        return impl.apply(this, arguments);
        };
    };
})
.factory('geolocation', function ($rootScope, phonegapReady) {
  return {
    getCurrentPosition: function (onSuccess, onError, options) {
        navigator.geolocation.getCurrentPosition(function () {
               var that = this,
               args = arguments;

               if (onSuccess) {
                   $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                   });
                   }
               }, function () {
                    var that = this,
                    args = arguments;

                   if (onError) {
                        $rootScope.$apply(function () {
                            onError.apply(that, args);
                        });
                   }
               },
            options);
        }
    };
});



;