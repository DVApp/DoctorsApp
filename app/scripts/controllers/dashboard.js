App.controller('dashboardController', ['$scope', '$stateParams', '$state', '$rootScope', '$filter', '$location', 'uiCalendarConfig', '$modal', 'eventService',
    function($scope, $stateParams, $state, $rootScope, $filter, $location, uiCalendarConfig, $modal, eventService) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        $scope.alertOnEventClick = function(date, jsEvent, view) {
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
            eventService.GetEventsList().then(function(res) {
                angular.forEach(res.data, function(item, key) {
                        console.log(item)
                        $scope.events.push({ id: item.EventId, title: item.EvenName, start: new Date(item.StartDate), end: new Date(item.EndDate), des: item.EventDescription })
                    })
                    //$scope.events = res.data;
                console.log($scope.events)
                $scope.eventSources = [$scope.events];
            })
        }
        $scope.loadEvents();
        // $scope.events = [
        //     { title: 'EventName1', start: new Date('2017-02-12'), end: new Date('2017-02-6') },
        //     { title: 'EventName2', start: new Date('2016-12-11'), end: new Date('2016-12-14') },
        //     { title: 'EventName3', start: new Date('2016-12-28'), end: new Date('2016-12-31') },
        // ];
        /* config object */
        $scope.uiConfig = {
            calendar: {

                droppable: true,
                height: 450,
                editable: true,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };

        $scope.alertOnEventClick = function(date, jsEvent, view) {
            console.log(date)
        };
        /* event sources array*/

        $scope.eventSources = [$scope.events];
    }
]);
App.controller('eventviewpopupCtrl', ['$scope', 'items', '$modalInstance', '$http', '$state',
    function($scope, items, $modalInstance, $http, $state) {

        console.log(items)
        $scope.eventData = items.eventList;
        $scope.startdate = new Date($scope.eventData.start.toString());
        $scope.enddate = new Date($scope.eventData.end.toString());

        $scope.closeCustomPopup = function() {
            //$modalInstance.close();
            $modalInstance.dismiss('cancel');
        };
        $scope.ok = function(response) {

            $modalInstance.close(response);
        };
    }
]);
