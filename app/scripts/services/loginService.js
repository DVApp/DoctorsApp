'use strict';

/**
 * @ngdoc service
 * @name adminApp.LoginService
 * @description
 * # LoginService
 * Service in the adminApp.
 */
App.service('LoginService', function($q, $http, $timeout, $location, httpService, $cookies, $state) {
    var loginData = null;
    var AuthData = null

    return {
        login: function(credentials) {

            var request = httpService.httpRequest('UserSettings/Login', "P", credentials);
            request.then(function(data) {
                loginData = data;
                
            });
            return request;
        },
        islogedin: function() {
            var $request = $cookies.get('IsAuth');
            return $request;
        },
        getLoginData: function() {
            return loginData;
        },
        getLoginSesionId: function() {
            return loginData;
        },
        logout: function() {
            $cookies.remove('IsAuth');
            $cookies.remove('loggedinauth');

        },
        checkLogin: function() {
            var loggedIn = $cookies.get('loggedinauth');
            return loggedIn;
        }
    };

});
