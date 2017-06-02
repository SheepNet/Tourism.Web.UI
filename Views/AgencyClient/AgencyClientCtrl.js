/**
 * Created by qscqs on 2017/5/31.
 */
//主界面控制器
Ctrl.controller("AgencyClientCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    $state.go("agencyClient.agencyInfoCenter");
}]);

//消息中心控制器
Ctrl.controller("AgencyInfoCenterCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    //$state.go("agencyClient.agencyInfoCenter");
}]);

//个人信息中心控制器
Ctrl.controller("AgencyEditCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    //$state.go("agencyClient.agencyInfoCenter");
}]);

//订单详情界面
Ctrl.controller("OrderDetailAgencyCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    //$state.go("agencyClient.agencyInfoCenter");
}]);

//结束订单控制器
Ctrl.controller("OrderEndAgencyCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    //$state.go("agencyClient.agencyInfoCenter");
}]);

//正在进行订单控制器
Ctrl.controller("OrderNowAgencyCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    $scope.publicOrder=function(){
        $state.go("agencyClient.orderPublishAgency");
    }
}]);

//订单发布控制器
Ctrl.controller("OrderPublishAgencyCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    //$state.go("agencyClient.agencyInfoCenter");
}]);