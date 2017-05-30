/**
 * Created by admin on 2016/8/25.
 */
var Ctrl=angular.module('Ctrl',[]);
//过滤器
Ctrl.filter('paging', function() {
    return function (items, index, pageSize) {
        if (!items)
            return [];

        var offset = (index - 1) * 4;
        return items.slice(offset, offset + 3);
    }
});

Ctrl.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
}]);

//打星星控制器+指令
Ctrl.controller('ctrl',function($scope,$http){


});

//Ctrl.directive('star', function () {
//    return {
//        template: '<ul class="rating" ng-mouseleave="leave()">' +
//        '<li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1)" ng-mouseover="over($index + 1)">' +
//        '\u2605' +
//        '</li>' +
//        '</ul>',
//        scope: {
//            ratingValue: '=',
//            max: '=',
//            readonly: '@',
//            onHover: '=',
//            onLeave: '='
//        },
//        controller: function($scope){
//            $scope.ratingValue = $scope.ratingValue || 0;
//            $scope.max = $scope.max || 5;
//            $scope.click = function(val){
//                if ($scope.readonly && $scope.readonly === 'true') {
//                    return;
//                }
//                $scope.ratingValue = val;
//            };
//            $scope.over = function(val){
//                $scope.onHover(val);
//            };
//            $scope.leave = function(){
//                $scope.onLeave();
//            }
//        },
//        link: function (scope, elem, attrs) {
//            elem.css("text-align", "left");
//            var updateStars = function () {
//                scope.stars = [];
//                for (var i = 0; i < scope.max; i++) {
//                    scope.stars.push({
//                        filled: i < scope.ratingValue
//                    });
//                }
//            };
//            updateStars();
//
//            scope.$watch('ratingValue', function (oldVal, newVal) {
//                if (newVal) {
//                    updateStars();
//                }
//            });
//            scope.$watch('max', function (oldVal, newVal) {
//                if (newVal) {
//                    updateStars();
//                }
//            });
//        }
//    };
//});


