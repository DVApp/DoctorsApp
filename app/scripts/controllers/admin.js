'use strict';

/**
 * @ngdoc function
 * @name DoctorsApp.controller:addDoctorController
 * @description
 * # addDoctorController
 * Controller of the DoctorsApp
 */
App.controller('addDoctorController', ['$scope', '$state', '$rootScope', '$cookies', 'LoginService', '$http', function($scope, $state, $rootScope, $cookies, LoginService, $http) {

   $scope.SaveUser=function(user){
     console.log(user)
   }

}]);
