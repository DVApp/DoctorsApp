App.controller('dashboardController', ['$scope', '$stateParams', '$state', '$rootScope', '$filter', '$location', 'uiCalendarConfig', '$modal', 'eventService',
    function($scope, $stateParams, $state, $rootScope, $filter, $location, uiCalendarConfig, $modal, eventService) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        $scope.alertOnEventClick = function(date, jsEvent, view) {
            console.log(date)
            $scope.eventList = date;
            var modalInstance2 = $modal.open({
                templateUrl: 'views/callender-event-view.html',
                controller: 'eventviewpopupCtrl',
                // backdrop : 'static'
                size: '',
                resolve: {
                    items: function() {
                        return $scope;
                    }
                }
            });
            modalInstance2.result.then(function(data) {



            });
        };
        /* alert on Drop */
        $scope.alertOnDrop = function(date, jsEvent, ui, view) {
            console.log(date);
        };
        /* alert on Resize */
        $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view) {
            //$scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        $scope.events = [];
        $scope.loadEvents = function() {
                //$scope.events = [];
                eventService.GetEventsList().then(function(res) {

                    angular.forEach(res.data, function(item, key) {

                            $scope.events.push({ id: item.EventId, title: item.EvenName, start: new Date(item.StartDate), end: new Date(item.EndDate), des: item.EventDescription })
                        })
                        //$scope.events = res.data;

                })
                $scope.eventSources = [$scope.events];
            }
            // $scope.events = [
            //     { title: 'All Day Event', start: new Date('Thu Oct 17 2013 09:00:00 GMT+0530 (IST)') },
            //     { title: 'Long Event', start: new Date('Thu Oct 17 2013 10:00:00 GMT+0530 (IST)'), end: new Date('Thu Oct 17 2013 17:00:00 GMT+0530 (IST)') },
            //     { id: 999, title: 'Repeating Event', start: new Date('Thu Oct 17 2013 09:00:00 GMT+0530 (IST)'), allDay: false },
            //     { id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
            //     { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false },
            //     { title: 'Click for Google', start: new Date('2017-07-03'), end: new Date('2017-08-05'), url: 'http://google.com/' }
            // ];

        $scope.loadEvents();
        // $scope.events = [
        //     { title: 'EventName1', start: new Date('2017-06-25'), end: new Date('2017-06-25') },
        //     { title: 'EventName2', start: new Date('2016-12-11'), end: new Date('2016-12-14') },
        //     { title: 'EventName3', start: new Date('2016-12-28'), end: new Date('2016-12-31') },
        // ];
        /* config object */
        $scope.uiConfig = {
            calendar: {
                theme: false,
                droppable: true,
                height: 450,
                editable: true,
                allDay: true,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender,
                eventLimit: true,
                events: function(start, end, timezone, callback) {
                    callback($scope.events);
                },
                viewRender: function(view, calendar) {
                    console.log(view)
                    currentView = view;

                    calendar.fullCalendar('changeView', view);
                }
            }
        };

        $scope.changeView = function(view, calendar) {
            currentView = view;
            alert(1)
            calendar.fullCalendar('changeView', view);
            $scope.$apply(function() {
                $scope.alertMessage = ('You are looking at ' + currentView);
            });
        };
        /* event sources array*/

        $scope.eventSources = [$scope.events];
        $scope.createEvent = function() {

            var modalInstance = $modal.open({
                templateUrl: 'views/create-event.html',
                controller: 'createeventpopupCtrl',
                // backdrop : 'static'
                size: '',
                resolve: {
                    items: function() {
                        return $scope;
                    }
                }
            });
            modalInstance.result.then(function(data) {
                $scope.events=[];
                $scope.loadEvents();
            });
        }
    }
]);
App.controller('eventviewpopupCtrl', ['$scope', 'items', '$modalInstance', '$http', '$state',
    function($scope, items, $modalInstance, $http, $state) {

        console.log(items)
        $scope.eventData = items.eventList;
        $scope.startdate = new Date($scope.eventData.start);
        if ($scope.eventData.end) {
            $scope.enddate = new Date($scope.eventData.end);

        } else {
            $scope.enddate = new Date($scope.eventData.start);

        }
        console.log($scope.eventData.end)

        $scope.closeCustomPopup = function() {
            //$modalInstance.close();
            $modalInstance.dismiss('cancel');
        };
        $scope.ok = function(response) {

            $modalInstance.close(response);
        };
    }
]);
App.controller('createeventpopupCtrl', ['$scope', 'items', '$modalInstance', '$http', '$state', 'eventService', '$filter',
    function($scope, items, $modalInstance, $http, $state, eventService, $filter) {
        $scope.addEvent = function(evnt) {


            evnt.CreatedBy = 1;
            evnt.ModifiedBy = 1;
            evnt.CreatedDate = $filter('date')(new Date(), 'yyyy-MM-dd')
            evnt.ModifiedDate = $filter('date')(new Date(), 'yyyy-MM-dd')
            $scope.time = $filter('date')(evnt.evntTime, 'HH:mm')
            evnt.StartDate = evnt.StartDate + " " + $scope.time;
            evnt.EndDate = evnt.StartDate;
            eventService.CreateEventList(evnt).then(function(res) {
                console.log(evnt)
                $modalInstance.close()
            });
            
        }
        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.update = function() {
            var d = new Date();

            $scope.mytime = d;
        };

        $scope.ismeridian = false;
    }

]);
