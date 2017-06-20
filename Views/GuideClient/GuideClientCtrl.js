/**
 * Created by YOUNG on 2017/5/30.
 */
//主界面控制器
Ctrl.controller("GuideClientCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "$cookieStore","$location", function ($scope, $http, $sce, $state, $stateParams, $cookieStore,$location) {
    var userMessage = $cookieStore.get("user");
    $scope.session_id = $cookieStore.get("session_id");
    if (userMessage == null) {
        $location.path("index")
    }
    $scope.User = userMessage;
    $state.go("guideClient.guideInfoCenter");

    //定义分页最大显示，全局通用
    $scope.maxSize = 7;

    //定义打星功能的部分方法

    $scope.readonly = false;
    $scope.onHover = function(val){
        $scope.hoverVal = val;
    };
    $scope.onLeave = function(){
        $scope.hoverVal = null;
    }
    $scope.onChange = function(val){
        $scope.ratingVal = val;
    }
}]);

//消息中心控制器
Ctrl.controller("GuideInfoCenterCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "centerService", function ($scope, $http, $sce, $state, $stateParams, centerService) {
    $scope.reportData = [];

    $scope.InfoObj={
        title:"",
        begin_date:"",
        end_date:"",
        page:1,
        page_size:10,
        session_id:$scope.session_id
    }

    $scope.currentPage = 1;
    $scope.totalItems = 13;
    $scope.pagesize = 7;


    $scope.ToEdit = function () {
        $state.go("guideClient.joinUs");
    };
    $scope.pageChanged = function () {
        $scope.init();
    }
    $scope.init = function () {
        var promise = centerService.getList($scope.InfoObj);
        promise.then(function (data) {
            $scope.totalItems = data.msg_body.total_count;
            $scope.infoList = data.msg_body.notify;
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
    }

    $scope.searchInfo = function () {
        console.log(angular.element(".startTime").val());
    }

    $scope.init();
}]);

//个人中心控制器
Ctrl.controller("GuideEditCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams","$cookieStore","centerService", function ($scope, $http, $sce, $state, $stateParams,$cookieStore,centerService) {
    var userMessage = $cookieStore.get("user");
    if(userMessage.guide_card_no==null){
        $scope.completeMode = false;
    }else {
        $scope.completeMode = true;
    }

    //编辑信息部分
    $scope.completeMessage={}
    $scope.sex = 0;

    //性别变化
    $scope.changeSex = function (sex) {
        $scope.sex = sex;
    }

    //完善信息提交按钮
    $scope.submitMessage = function () {
        console.log($scope.registForm);
        if ($scope.sex == 0) {
            layer.msg("请选择性别", {icon: 0});
            return true;
        }

        if ($scope.registForm.$invalid) {
            layer.msg("请根据要求输入信息", {icon: 0});
            return true;
        }
        var promise = centerService.completeMessage(
            $scope.completeMessage.name,
            $scope.sex,
            $scope.completeMessage.address,
            $scope.completeMessage.guide_card_id,
            $scope.guide_card_id_photo,
            $scope.completeMessage.guide_card_no,
            $scope.guide_card_no_photo,
            $scope.session_id
        );
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.msg("完成编辑", {icon: 1,time:1000})
                $scope.completeMode = true;
            } else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })

    }
    //图片展示
    $scope.showPic = function () {
        layer.open({
            type: 1,
            shade: 0.3,
            title: false,
            content: $('.picArea')
        });
    }

    $scope.TurnToJionUs=function(){
        $state.go("guideClient.joinUs")
    }

    $scope.file_changed = function(element) {
        var uuid = $ui.fileupload({
            fileSelector: '.upload-file-input',
            type: FILETYPE.IMAGE,
            moudle: 'BASE'
        }).uuid;
        $scope.$apply(function(){
           console.log(1);
        })
    };

    $scope.imageChange=function(){
        var uuid = $ui.fileupload({
            fileSelector: '.upload-file-input',
            type: FILETYPE.IMAGE,
            moudle: 'BASE'
        }).uuid;
        alert(uuid);
    }

}]);

//订单详情控制器
Ctrl.controller("OrderDetailCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", function ($scope, $http, $sce, $state, $stateParams) {

}]);

//可接受订单控制器
Ctrl.controller("OrderReceiveCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams","gudieService", function ($scope, $http, $sce, $state, $stateParams,gudieService) {

    $scope.State="index";
    //初始化星星
    $scope.orderDetail={
        star:1
    };

    $scope.totalItems = 13;

    $scope.orderList=[];

    $scope.orderObj={
        type:10,
        title:"",
        order_type:"1",
        page:1,
        page_size:5,
        session_id:$scope.session_id
    }

    $scope.pageChanged = function () {
        $scope.init();
    }

    $scope.OrdertypeChange=function(){
        $scope.init();
    }

    $scope.init=function(){
        var promise=gudieService.getorderList($scope.orderObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.orderList=data.msg_body.order;
                $scope.totalItems = data.msg_body.count.type_10_count;
            } else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
    }

    $scope.init();

    $scope.turnToDetail=function(id){
        var promise=gudieService.getorderDetail(id,$scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.orderDetail=data.msg_body.order;
                $scope.State="detail";
            } else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
    }

    $scope.turnToIndex=function(){
        $scope.State="index";
    }

}]);

//正在进行订单控制器
Ctrl.controller("OrderNowCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams","gudieService", function ($scope, $http, $sce, $state, $stateParams,gudieService) {
    $scope.State="index";
    //初始化星星
    $scope.orderDetail={
        star:1
    };

    $scope.orderObj={
        type:20,
        title:"",
        order_type:"1",
        page:1,
        page_size:5,
        session_id:$scope.session_id
    }

    $scope.OrdertypeChange=function(){
        $scope.init();
    }

    $scope.pageChanged = function () {
        $scope.init();
    }

    $scope.typeChange = function (type) {
        $scope.orderObj.page = 1;
        $scope.orderObj.type=type;
        $scope.init();
    }

    $scope.init=function(){
        var promise=gudieService.getorderList($scope.orderObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.orderList=data.msg_body.order;
                $scope.orderCount=data.msg_body.count;
                switch($scope.orderObj.type)
                {
                    case 20:
                        $scope.totalItems=$scope.orderCount.type_20_count;
                        break;
                    case 21:
                        $scope.totalItems=$scope.orderCount.type_21_count;
                        break;
                    case 22:
                        $scope.totalItems=$scope.orderCount.type_22_count;
                        break;
                    case 23:
                        $scope.totalItems=$scope.orderCount.type_23_count;
                        break;
                    default:
                        break;
                }
            } else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
    }

    $scope.init();

    $scope.turnToDetail=function(id){
        var promise=gudieService.getorderDetail(id,$scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.orderDetail=data.msg_body.order;
                $scope.State="detail";
            } else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
    }

    $scope.turnToIndex=function(){
        $scope.State="index";
    }

}]);

//结束订单控制器
Ctrl.controller("OrderEndCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams","gudieService", function ($scope, $http, $sce, $state, $stateParams,gudieService) {

    $scope.State="index";

    $scope.orderObj={
        type:30,
        title:"",
        order_type:"1",
        page:1,
        page_size:5,
        session_id:$scope.session_id
    }

    $scope.pageChanged = function () {
        $scope.init();
    }

    $scope.OrdertypeChange=function(){
        $scope.init();
    }

    $scope.init=function(){
        var promise=gudieService.getorderList($scope.orderObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.orderList=data.msg_body.order;
                $scope.totalItems=data.msg_body.count.type_30_count;
            } else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
    }

    $scope.init();

    $scope.turnToDetail=function(id){
        var promise=gudieService.getorderDetail(id,$scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.orderDetail=data.msg_body.order;
                $scope.State="detail";
            } else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
    }


}]);

//投诉中心控制器
Ctrl.controller("guideComplaintCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams","gudieService", function ($scope, $http, $sce, $state, $stateParams,gudieService) {

    $scope.obj=
    {
        "complain_type": 1,
        "content": "",
        "content_file": [
        ],
        "complain_mobile": "投诉人手机",
        "session_id":$scope.session_id
    }

    $scope.AddComplain=function(){
        if($scope.obj.content.length>500){
            layer.msg("投诉或建议在500字以内", {icon: 0});
            return true;
        }

        var promise=gudieService.addComplian($scope.obj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.msg("提交成功", {icon: 1})
            } else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })

    }

}]);

//投诉中心控制器
Ctrl.controller("JoinUsCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", function ($scope, $http, $sce, $state, $stateParams) {

    $scope.step=1;

    $scope.DownaAreement=function(){
        $scope.step=2;
    }

    $scope.NextStep=function(step){
        $scope.step=step;
    }
    $scope.turnToCenter=function(){
        $state.go("guideClient.guideEdit");
    }


}]);
