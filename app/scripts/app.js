'use strict';

/**
 * @ngdoc overview
 * @name 247commerceApp
 * @description
 * # 247commerceApp
 *
 * Main module of the application.
 */
var App = angular.module('DoctorsApp', ['ui.router', 'ngRoute', 'ui.calendar', 'ui.bootstrap', 'ngCookies']);
App.constant('urls', {
    LOCAL_API: '192.168.0.2:8686',
    SERVER_API: 'compete.247commerce.com'
})
App.config(['$stateProvider', '$urlRouterProvider', '$filterProvider', '$routeProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $filterProvider, $routeProvider, $httpProvider) {

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        //$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        //$httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
       // $httpProvider.defaults.useXDomain = true;

        // defaults to dashboard
        $urlRouterProvider.otherwise('/app/dashboard');
        //
        // Application Routes
        // -----------------------------------
        $stateProvider.state('app', {
            url: '/app',
            title: 'App',
            views: {
                "content@": {
                    templateUrl: "views/app.html",
                    controller: 'AppController'
                }
            }
        }).state('login', {
            url: '/login',
            title: "Login",
            views: {
                "content@": {
                    templateUrl: "views/login.html",
                    controller: 'loginController'
                }
            }
        }).state('app.dashboard', {
            url: '/dashboard',
            title: "Dashboard",
            views: {
                "pcontent": {
                    templateUrl: "views/dashboard.html",
                    controller: 'dashboardController'
                }
            }
        }).state('app.createdoctor', {
            url: '/createdoctor',
            title: "Create Doctor",
            views: {
                "pcontent": {
                    templateUrl: "views/add-doctor.html",
                    controller: 'addDoctorController'
                }
            }
        }).state('app.createpatient', {
            url: '/createpatient',
            title: "Create Patient",
            views: {
                "pcontent": {
                    templateUrl: "views/add-patient.html",
                    controller: 'addPatientController'
                }
            }
        })
    }
]);
App.run(["$rootScope", "$state", "$cookieStore", "$stateParams", '$window', 'LoginService', '$location', '$filter', '$http', '$timeout',
    function($rootScope, $state, $cookieStore, $stateParams, $window, LoginService, $location, $filter, $http, $timeout) {
        //cfpLoadingBar.start();
        
        $rootScope.app = {
            name: 'DoctorsApp',
            description: 'All Rights Reserved.',
            year: '2016 - ' + (new Date()).getFullYear() + ' |',
            layout: {
                isFixed: true,
                isCollapsed: false,
                isBoxed: false,
                isRTL: false
            },
            viewAnimation: 'ng-fadeInUp'
        };

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var islogedin = LoginService.islogedin();

            if (islogedin) {
                $cookieStore.put('loggedinauth', 'true');
            } else {
                $cookieStore.put('loggedinauth', '');
            }
            //var result = LoginService.checkLogin();

            if ($location.path() === '/login' || $location.path() === '/') {

                if ($cookieStore.get('loggedinauth')) {
                    event.preventDefault();
                    $state.go('app.dashboard');
                }
                return;
            }

            if (!$cookieStore.get('loggedinauth')) {
                event.preventDefault();
                $state.go('login');
                return
            }

        });

    }
])
