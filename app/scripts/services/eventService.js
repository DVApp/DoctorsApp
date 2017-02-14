'use strict';

/**
 * @ngdoc service
 * @name adminApp.eventService
 * @description
 * # eventService
 * Service in the adminApp.
 */
App.service('eventService', function($q, $http, $timeout, $location, httpService, $cookieStore, $cookies, $state) {
   
    return {
        GetEventsList: function(credentials) {
            return httpService.httpRequest('Events/eventList', "P");
        }
    };

});
