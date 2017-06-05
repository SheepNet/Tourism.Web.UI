/**
 * Created by YOUNG on 2017/5/30.
 */
//首页控制器

Ctrl.controller("ManageCenterCtrl",["$scope","$http","$sce","$state","$stateParams","$cookieStore",function ($scope, $http, $sce,$state,$stateParams,$cookieStore) {
    var userMessage=$cookieStore.get("user") ;
    $scope.session_id=$cookieStore.get("session_id") ;
    if(userMessage==null){
        $state.go("index");
    }
    $scope.User=userMessage;
    $state.go("manage.infoCenter");

}]);

//消息中心控制器
Ctrl.controller("InfoCenterCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {

}]);

//审核中心
Ctrl.controller("VerifyCenterCtrl",["$scope","$http","$sce","$state","$stateParams","$cookieStore","centerService",function ($scope, $http, $sce,$state,$stateParams,$cookieStore,centerService) {
    $scope.reportData = [];
    $scope.maxSize = 7;
    $scope.currentPage = 1;
    $scope.totalItems = 13;
    $scope.pagesize=5;
    //$scope.session_id=$cookieStore.get("session_id") ;

    $scope.verifyList=[];
    $scope.pageChanged = function () {
        $scope.init();
    }
    $scope.init=function(){
        var promise= centerService.getVerifyList($scope.searchTitle,$scope.begin_date,$scope.end_date,$scope.currentPage,$scope.pagesize,$scope.session_id);
        promise.then(function(data){
            $scope.totalItems=data.msg_body.total_count;
            $scope.verifyList=data.msg_body.data;
        })
    }
    $scope.init();

    var now_id="";

    $scope.verifyGuide=function(id){
        now_id=id;
        var promise= centerService.query(id,$scope.session_id);
        promise.then(function(data){
            $scope.totalItems=data.msg_body.total_count;
            $scope.guideInfo=data.msg_body.data;
            $scope.State='detail';
        })
    }

    //审核导游
    $scope.guideCheck=function(check_status){
            var promise= centerService.check(now_id,check_status,$scope.session_id);
            promise.then(function(data){
                $scope.init();
                $scope.State='index';
            })

    }
    $scope.State='index';
}]);

//订单中心
Ctrl.controller("OrderManageCtrl",["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
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

