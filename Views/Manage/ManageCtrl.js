/**
 * Created by YOUNG on 2017/5/30.
 */
//首页控制器

Ctrl.controller("ManageCenterCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    $scope.title="消息中心";
    $state.go("manage.infoCenter");

}]);

//消息中心控制器
Ctrl.controller("InfoCenterCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {

}]);

Ctrl.controller("GudieManageCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    $scope.State='index';
    $scope.ShowDetail=function(){
        $scope.State='detail';
    }
}]);