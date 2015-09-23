(function(){
  'use strict';
  var module = angular.module('app', ['onsen']);
    
    
    module.controller('HomeController', function($scope, $data) {
    
        $scope.newReminder = function() {
          console.log('new reminder!');
          $scope.home-nav.pushPage('new.html');
        }
    
    });

    module.controller('CategoryController', function($scope, $data) {
        console.log($scope.reminder_title);
        
        $scope.nav = function() {
            $scope.$apply();
            homeNavigator.pushPage('time.html', { animation : 'slide' } );
        }

    });
    
    module.controller('TaskController', function($scope, $data) {
        
        $scope.nav = function() {
            $scope.$apply();
            homeNavigator.pushPage('category.html', { animation : 'slide' } )
        }
        
        $scope.reminder_title = {};

    });
    
    module.controller('TimeController', function($scope, $data) {
    
    
    });
    
        module.controller('SettingsController', function($scope, $data) {
    
    
    });
    
        module.controller('HelpController', function($scope, $data) {
    
    
    });
    
    

    
    
  module.factory('$data', function() {
      var data = {};

      data.items = [
          {
              title: 'Item 1 Title',
              label: '4h',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          },
          {
              title: 'Another Item Title',
              label: '6h',
              desc: 'Ut enim ad minim veniam.'
          },
          {
              title: 'Yet Another Item Title',
              label: '1day ago',
              desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          },
          {
              title: 'Yet Another Item Title',
              label: '1day ago',
              desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          }
      ];

      return data;
  });
})();