'use strict';

/**
 * @ngdoc function
 * @name DoctorApp.controller:loginController
 * @description
 * # loginController
 * Controller of the DoctorApp
 */
App.controller('loginController', ['$scope', '$state', '$rootScope', '$cookies', 'LoginService', '$http', function($scope, $state, $rootScope, $cookies, LoginService, $http) {

    $scope.login = function(user) {
        // var doc = new jsPDF();
        // doc.addHTML($('.page-container'), {
        //     'background': '#fff',
        //     'margin':20
        // }, function() {
        //     doc.save('sample-file.pdf');
        // });
        $cookies.remove('loggedinauth');

        LoginService.login(user).then(function(response) {



            if (response.statuscode == 0) {

                $cookies.put('loggedinauth', 'true');
                $cookies.put('IsAuth', btoa(response.data[0].Session));

                $state.go('app.dashboard');

            } else {
                $scope.authMsg = response.statusmessage;


            }
        });

    }

}]);
