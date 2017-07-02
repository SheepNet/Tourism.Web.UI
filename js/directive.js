Ctrl.directive("guideInfo", function () {
    return {
        restrict: "E",
        templateUrl: "Views/temp/guideInfo.html",
        replace: true,
    }
});

Ctrl.directive("orderDetail", function () {
    return {
        restrict: "E",
        templateUrl: "Views/temp/orderDetail.html",
        replace: true,
    }
});

Ctrl.directive("orderGuide", function () {
    return {
        restrict: "E",
        templateUrl: "Views/temp/orderGuide.html",
        replace: true,
    }
});

Ctrl.directive("agencyInfo", function () {
    return {
        restrict: "E",
        templateUrl: "Views/temp/agencyInfo.html",
        replace: true,
    }
});

Ctrl.directive("infoTemp", function () {
    return {
        restrict: "E",
        templateUrl: "Views/temp/infoTemp.html",
        replace: true,
    }
});

Ctrl.directive("orderHistory", function () {
    return {
        restrict: "E",
        templateUrl: "Views/temp/orderHistory.html",
        replace: true,
    }
});

//打星指令
Ctrl.directive('star', function () {
    return {
        template: '<ul class="rating" ng-mouseleave="leave()">' +
        '<li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1)" ng-mouseover="over($index + 1)" data-content="\u2605">' +
        '\u2605' +
        '</li>' +
        '</ul>',
        scope: {
            ratingValue: '=',
            max: '=',
            readonly: '@',
            onHover: '=',
            onLeave: '='
        },
        controller: function($scope){
            if($scope.ratingValue==null){
                $scope.ratingValue=0;
            }
            $scope.ratingValue = $scope.ratingValue || 0;
            $scope.max = $scope.max || 5;
            $scope.click = function(val){
                if ($scope.readonly && $scope.readonly === 'true') {
                    return;
                }
                $scope.ratingValue = val;
            };
            $scope.over = function(val){
                $scope.onHover(val);
            };
            $scope.leave = function(){
                $scope.onLeave();
            }
        },
        link: function (scope, elem, attrs) {
            //elem.css("text-align", "center");
            var updateStars = function () {
                scope.stars = [];
                if(scope.ratingValue%1==0){
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                }else {
                    //半星处理，这里样式有点问题
                    var num=parseInt(scope.ratingValue);
                    for (var i = 0; i < scope.max; i++) {
                        if(i<num){
                            scope.stars.push({
                                filled: true
                            });
                        }else if(i==num){
                            scope.stars.push({
                                halfstar: true
                            });
                        }else {
                            scope.stars.push({
                                filled: false
                            });
                        }
                    }
                }
            };
            updateStars();

            scope.$watch('ratingValue', function (newVal,oldVal) {
                //if (newVal) {
                    updateStars();
                //}
            });
            scope.$watch('max', function (oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });
        }
    };
});

Ctrl.directive('timeChange', function () {
    return {
        restrict:"A",
        replace:false,
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelController) { //这里的scope,elm,attrs,ngModelController都是可以改变变量名的
            ngModelController.$render=function(){
                elm.val(ngModelController.$viewValue);
            }

            elm.on('blur keyup change focus', function() {
                scope.$apply(function(){
                    ngModelController.$setViewValue(elm.val())
                });
            });

        }
    }
})