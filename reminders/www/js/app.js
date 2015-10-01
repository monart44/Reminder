(function(){
  'use strict';
  var module = angular.module('app', ['onsen', 'service', 'ui.bootstrap', 'ngAnimate']);
    
    
    module.controller('HomeController', function($scope, $data, ParseService) {
     
        $scope.newReminder = function() {
          console.log('new reminder!');
          $scope.home-nav.pushPage('new.html');
        }
    
    });

 
    module.controller('ReminderController', function($scope, $rootScope, $data) {
            
      // Variables
      $rootScope.alarm = {};
      $rootScope.category = {};
      $rootScope.task = {};
        
        
        
      $scope.setCurrentCategory = function(category) {
        $rootScope.category = category;
        console.log('Category set to ' + $scope.category);
      }
      
      // Values
      $scope.checkValues = function() {
         console.log("Task is " + $rootScope.task);
         console.log("Category is " + $rootScope.category);
         console.log("Date is " + $rootScope.dt);
         //console.log("Alarm is " + $rootScope.alarm.isChecked());
      };
        
      // Navigation
      $scope.nav = function(_page) {
        console.log(_page);
        $scope.checkValues();
        homeNavigator.pushPage(_page, { animation : 'slide' } )   
      }
        
      // Date
      $scope.today = function() {
        $scope.dt = new Date();
      };
      $scope.today();
      $scope.clear = function () {
        $scope.dt = null;
      };
      $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };
      $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();
      $scope.maxDate = new Date(2020, 5, 22);
      $scope.open = function($event) {
        $scope.status.opened = true;
      };
      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };
      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.status = {
        opened: false
       };
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 2);
      $scope.events =
        [
          {
            date: tomorrow,
            status: 'full'
          },
          {
            date: afterTomorrow,
            status: 'partially'
          }
        ];
      $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i=0;i<$scope.events.length;i++){
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
      };
    
        

        
    
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