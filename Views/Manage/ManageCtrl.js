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

//审核中心
Ctrl.controller("VerifyCenterCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    $scope.State='index';
}]);

//订单中心
Ctrl.controller("OrderManage",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    $scope.State='index';
    $scope.ShowDetail=function(){
        $scope.State='detail';
    }
    $scope.ShowAgrncyHistory=function(){
        $scope.State='history';
    }
}]);

//导游管理
Ctrl.controller("GudieManageCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    $scope.State='index';
    $scope.ShowDetail=function(){
        $scope.State='detail';
    }
    $scope.ShowGudieHistory=function(){
        $scope.State='history';
    }
}]);

//旅行社管理
Ctrl.controller("AgencyManageCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    $scope.State='index';
    $scope.ShowDetail=function(){
        $scope.State='detail';
    }
    $scope.ShowAgrncyHistory=function(){
        $scope.State='history';
    }
}]);

//投诉中心
Ctrl.controller("ComplaintCenterCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    $scope.State='index';
    $scope.ShowDetail=function(){
        $scope.State='detail';
    }
    $scope.ShowAgrncyHistory=function(){
        $scope.State='history';
    }
}]);

//短信设置
Ctrl.controller("MessageSettingCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    $scope.State='index';
    $scope.AddSetting=function(){
        $scope.State='detail';
    }
    $scope.BackIndex=function(){
        $scope.State='index';
    }
}]);

