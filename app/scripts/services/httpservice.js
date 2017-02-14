'use strict';

/**
 * @ngdoc service
 * @name adminApp.httpService
 * @description
 * # httpService
 * Service in the adminApp.
 */
App.service('httpService', function($q, $http, $cookies, $cookieStore, $state, $log, urls) {
    var serializeData = function(data) {
        // If this is not an object, defer to native stringification.
        if (!angular.isObject(data)) {
            return ((data == null) ? "" : data.toString());
        }
        var buffer = [];
        // Serialize each key in the object.
        for (var name in data) {
            if (!data.hasOwnProperty(name)) {
                continue;
            }
            var value = data[name];
            buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent((value == null) ? "" : value));
        }
        // Serialize the buffer and clean it up for transportation.
        var source = buffer.join("&").replace(/%20/g, "+");
        return (source);
    };

    return {
        httpRequest: function(url, method, data) {
            var deffered = $q.defer();
            //var data = ( typeof data == "object") ? serializeData(data) : data;

            var methods = {
                'P': 'POST',
                'G': 'GET',
                'PU': 'PUT',
                'D': "DELETE"
            };

            $http({
                'method': methods[method] || 'POST',
                'url': "http://" + urls.LOCAL_API + "/DoctorsApis/API/" + url,
                'data': data,
                'headers': {
                    'Content-Type': 'application/json'

                }
            }).success(function(user) {
                deffered.resolve(user);
            }).error(function(error, code) {
                deffered.reject(error, code);
                $state.go('login')

            });
            return deffered.promise;
        }
    }

});
