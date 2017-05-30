/**
 * Created by YOUNG on 2017/5/30.
 */
//主界面控制器
Ctrl.controller("GuideClientCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    $state.go("guideClient.guideInfoCenter");
}]);

//消息中心控制器
Ctrl.controller("GuideInfoCenterCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {

    $scope.ToEdit=function(){
        $state.go("guideClient.joinUs");
    }
}]);

//个人中心控制器
Ctrl.controller("GuideEditCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    $scope.ToEdit=function(){
        $state.go("guideClient.guideEdit");
    }
}]);

//订单详情控制器
Ctrl.controller("OrderDetailCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {

}]);

//可接受订单控制器
Ctrl.controller("OrderReceiveCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {

}]);

//正在进行订单控制器
Ctrl.controller("OrderNowCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {

}]);

//结束订单控制器
Ctrl.controller("OrderEndCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {

}]);

//投诉中心控制器
Ctrl.controller("guideComplaintCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {

}]);
