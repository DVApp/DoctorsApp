'use strict';

/**
 * @ngdoc function
 * @name DoctorApp.controller:loginController
 * @description
 * # loginController
 * Controller of the DoctorApp
 */
App.controller('loginController', ['$scope', '$state', '$rootScope', '$cookieStore', 'LoginService', '$http', function($scope, $state, $rootScope, $cookieStore, LoginService, $http) {

    $scope.login = function(user) {
        $cookieStore.remove('loggedinauth');

        LoginService.login(user).then(function(response) {



            if (response.statuscode == 0) {

                $cookieStore.put('loggedinauth', 'true');
                $cookieStore.put('IsAuth', btoa(response.data[0].Session));

                $state.go('app.dashboard');

            } else {
                $scope.authMsg = response.statusmessage;


            }
        });

    }

}]);
