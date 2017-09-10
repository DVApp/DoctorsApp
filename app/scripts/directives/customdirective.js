App.directive('validateForm', function() {
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            var $elem = $($element);
            if ($.fn.parsley)
                $elem.parsley();
        }
    };
});
App.directive("bootselectpicker", function($timeout) {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ctrl) {
            //$timeout(function() {
            element.selectpicker();
            //});
        }
    }
});
App.directive('bootstrapdatepicker', function() {
    return {
        restrict: "AE",
        require: 'ngModel',
        link: function(scope, el, attr, ngModel) {
            $(el).datepicker({
                format: 'yyyy-mm-dd',
                autoclose:true,
                todayHighlight: true,
                orientation: "bottom auto",
                
                onSelect: function(dateText) {
                    scope.$apply(function() {
                        ngModel.$setViewValue(dateText);
                    });
                }
            });
        }
    };
})

