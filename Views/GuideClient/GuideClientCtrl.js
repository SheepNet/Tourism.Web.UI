/**
 * Created by YOUNG on 2017/5/30.
 */
//主界面控制器
Ctrl.controller("GuideClientCtrl",["$scope","$http","$sce","$state","$stateParams","$cookieStore",function ($scope, $http, $sce,$state,$stateParams,$cookieStore) {
    var userMessage=$cookieStore.get("user") ;
    $scope.session_id=$cookieStore.get("session_id") ;
    if(userMessage==null){
        $state.go("index");
    }
    $scope.User=userMessage;
    $state.go("guideClient.guideInfoCenter");
}]);

//消息中心控制器
Ctrl.controller("GuideInfoCenterCtrl",["$scope","$http","$sce","$state","$stateParams","centerService",function ($scope, $http, $sce,$state,$stateParams,centerService) {
    $scope.reportData = [];
    $scope.maxSize = 7;
    $scope.currentPage = 1;
    $scope.totalItems = 13;
    $scope.pagesize=7;
    $scope.ToEdit=function(){
        $state.go("guideClient.joinUs");
    };
    $scope.pageChanged = function () {
        $scope.init();
    }
    $scope.init=function(){
        var promise= centerService.getList($scope.searchTitle,$scope.begin_date,$scope.end_date,$scope.currentPage,$scope.pagesize,$scope.session_id);
        promise.then(function(data){
            $scope.totalItems=data.msg_body.total_count;
            $scope.infoList=data.msg_body.notify;
        })
    }

    $scope.searchInfo=function(){
        console.log(angular.element(".startTime").val());
    }

    $scope.init();
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
