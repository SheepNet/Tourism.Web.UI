/**
 * Created by YOUNG on 2017/5/30.
 */
//主界面控制器
Ctrl.controller("GuideClientCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "$cookieStore", "$location","gudieService", function ($scope, $http, $sce, $state, $stateParams, $cookieStore, $location,gudieService) {
    var userMessage = $cookieStore.get("user_guide");
    $scope.ResUrl = rurl + "/resource/";
    $scope.session_id = $cookieStore.get("session_id_guide");
    if (userMessage == null) {
        $location.path("index")
    }
    $scope.User = userMessage;
    $state.go("guideClient.guideInfoCenter");

    //标题信息
    $scope.titleObj = {
        Tiptitle: "消息中心",
        count:0
    }

    $scope.changeTitle = function (title) {
        $scope.titleObj.Tiptitle = title
    }


    //定义分页最大显示，全局通用
    $scope.maxSize = 7;

    //定义打星功能的部分方法

    $scope.readonly = false;
    $scope.onHover = function (val) {
        $scope.hoverVal = val;
    };
    $scope.onLeave = function () {
        $scope.hoverVal = null;
    }
    $scope.onChange = function (val) {
        $scope.ratingVal = val;
    }

    //初始化可接订单
    $scope.orderObj = {
        type: 10,
        title: "",
        order_type: "1",
        page: 1,
        page_size: 5,
        session_id: $scope.session_id
    };

    $scope.init = function () {
        var promise = gudieService.getorderList($scope.orderObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.count = $scope.totalItems = data.msg_body.type_10_count;
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


}]);

//消息中心控制器
Ctrl.controller("GuideInfoCenterCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "centerService", "publicService", function ($scope, $http, $sce, $state, $stateParams, centerService, publicService) {

    $scope.InfoObj = {
        type: "21,22,23,31,14,12,51,52,53,30",
        title: "",
        begin_date: "",
        end_date: "",
        page: 1,
        page_size: 10,
        session_id: $scope.session_id
    }

    $scope.ToEdit = function () {
        $state.go("guideClient.joinUs");
    };
    $scope.pageChanged = function () {
        $scope.init();
    }

    $scope.initText=function(){
        $scope.InfoObj.page=1;
        $scope.init();
    }

    //键盘搜索事件
    $scope.searchKey = function(e) {
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.initText();
        }
    }

    $scope.init = function () {
        var promise = centerService.getList($scope.InfoObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.totalItems = data.msg_body.total_count;
                $scope.infoList = publicService.getRightInfo(data.msg_body.notify);
            }else {
                layer.msg(data.err_msg, {icon: 0});
            }
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

    $scope.turnToDetail = function (type, id) {
        switch (type) {
            case 21:
                $state.go("guideClient.joinUs");
                break;
            case 22:
            case 23:
            case 31:
                $state.go("guideClient.guideEdit");
                break;
            case 14:
            case 12:
                $state.go("guideClient.orderEnd", {"type": type, "id": id});
                break;
            case 51:
            case 52:
            case 53:
            case 30:
                $state.go("guideClient.orderNow", {"type": type, "id": id});
                break;
            default:
                break;
        }
    }

    $scope.init();
}]);

//个人中心控制器
Ctrl.controller("GuideEditCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "$cookieStore", "$location", "centerService", "gudieService", function ($scope, $http, $sce, $state, $stateParams, $cookieStore, $location, centerService, gudieService) {

    $scope.titleObj.Tiptitle = "个人中心";

    //初始化导游信息
    $scope.initGuideInfo = function () {
        var promise = gudieService.getGudieInfo($scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.guideInfo = data.msg_body.guide;
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

    var userMessage = $cookieStore.get("user_guide");
    if (userMessage == null) {
        $location.path("index")
    }
    if (userMessage.guide_card_no == null) {
        $scope.State = "edit"
    } else {
        $scope.initGuideInfo();
        $scope.State = "index"
    }

    $scope.InfoObj = {
        level: userMessage.level,
        guide_card_no: userMessage.guide_card_no
    }


    //编辑信息部分
    $scope.completeMessage = {
        name: "",
        sex: 0,
        address: "",
        guide_card_id: "",
        guide_card_id_photo: "",
        guide_card_no: "",
        guide_card_no_photo: "",
        session_id: $scope.session_id
    };

    //性别变化
    $scope.changeSex = function (sex) {
        $scope.completeMessage.sex = sex;
    }

    //完善信息提交按钮
    $scope.submitMessage = function () {
        if ($scope.completeMessage.sex == 0) {
            layer.msg("请选择性别", {icon: 0});
            return true;
        }

        if ($scope.registForm.$invalid) {
            layer.msg("请根据要求输入信息", {icon: 0});
            return true;
        }
        //var promise = centerService.completeMessage(
        //    $scope.completeMessage.name,
        //    $scope.sex,
        //    $scope.completeMessage.address,
        //    $scope.completeMessage.guide_card_id,
        //    $scope.guide_card_id_photo,
        //    $scope.completeMessage.guide_card_no,
        //    $scope.guide_card_no_photo,
        //    $scope.session_id
        //);
        var promise = centerService.completeMessage($scope.completeMessage);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.msg("完成编辑", {icon: 1, time: 1000});
                $scope.initGuideInfo();
                userMessage.guide_card_no = $scope.completeMessage.guide_card_no;
                $cookieStore.put("user_guide", userMessage);
                $scope.State = "index"
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
    $scope.showPic = function (url) {
        $scope.showPicUrl = $scope.ResUrl + url;
        layer.open({
            type: 1,
            title: "查看图片",
            shade: 0.3,
            area: ["800px", "600px"],
            content: $('.picArea')
        });
    }

    $scope.showPicEdiit = function (url) {
        $scope.showPicUrl = $scope.ResUrl + url;
        layer.open({
            type: 1,
            title: "查看图片",
            shade: 0.3,
            area: ["800px", "600px"],
            content: $('.picAreaEdit')
        });
    }

    //删除图片
    $scope.delPic = function (type) {
        if (type == "guide_card_id_photo") {
            $scope.completeMessage.guide_card_id_photo = "";
        }
        if (type == "guide_card_no_photo") {
            $scope.completeMessage.guide_card_no_photo = "";
        }
    }

    //转向加入我们
    $scope.TurnToJionUs = function () {
        $state.go("guideClient.joinUs")
    }

    //上传文件
    $scope.file_changed = function (element) {
        var ele_id = angular.element(element).attr("id")
        var uuid = $ui.fileupload({
            fileSelector: '#' + ele_id,
            type: FILETYPE.IMAGE,
            moudle: 'BASE'
        }).uuid;

        $scope.$apply(function () {
            if (ele_id == "guide_card_id_photo") {
                $scope.completeMessage.guide_card_id_photo = uuid;
            }
            if (ele_id == "guide_card_no_photo") {
                $scope.completeMessage.guide_card_no_photo = uuid;
            }
        })
    };


    //上传文件
    $scope.file_changed_head = function (element) {

        var ele_id = angular.element(element).attr("id")
        var uuid = $ui.fileupload({
            fileSelector: '#' + ele_id,
            type: FILETYPE.IMAGE,
            moudle: 'BASE'
        }).uuid;

        $scope.$apply(function () {
            $scope.guideInfo.photo=uuid;
            $scope.User.photo=uuid;
            $cookieStore.put("user_guide", $scope.User);
            var promise = gudieService.photoEdit({photo:uuid,session_id:$scope.session_id});
            promise.then(function (data) {
                if (data.err_code == 0) {
                    layer.msg("头像替换成功", {icon: 0})
                } else {
                    layer.msg(data.err_msg, {icon: 0});
                }
            }, function (data) {
                layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
            });
            promise.catch(function (data) {
                layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
            })
        })
    };

    //$scope.init

}]);

//订单详情控制器
Ctrl.controller("OrderDetailCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", function ($scope, $http, $sce, $state, $stateParams) {

}]);

//可接受订单控制器
Ctrl.controller("OrderReceiveCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "gudieService", "publicService", function ($scope, $http, $sce, $state, $stateParams, gudieService, publicService) {

    $scope.State = "index";
    //初始化星星
    $scope.orderDetail = {
        star: 1
    };

    $scope.totalItems = 13;

    $scope.orderList = [];

    $scope.orderObj = {
        type: 10,
        title: "",
        order_type: "1",
        page: 1,
        page_size: 5,
        session_id: $scope.session_id
    };

    //预定义提交对象
    $scope.submitObj = {
        id: "",
        type: "",
        content: "",
        star: 0,
        session_id: $scope.session_id
    }

    $scope.pageChanged = function () {
        $scope.init();
    }

    //排序字段改变
    $scope.OrdertypeChange = function () {
        $scope.orderObj.page = 1;
        $scope.init();
    }

    //文本搜索
    $scope.initText = function () {
        $scope.orderObj.page = 1;
        $scope.init();
    }

    //键盘搜索事件
    $scope.searchKey = function(e) {
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.initText();
        }
    }

    $scope.init = function () {
        var promise = gudieService.getorderList($scope.orderObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle = "订单中心 > 可接订单";
                $scope.orderList = data.msg_body.order;
                $scope.totalItems = data.msg_body.type_10_count;
                $scope.titleObj.count = $scope.totalItems;
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

    $scope.turnToDetail = function (id) {
        var promise = gudieService.getorderDetail(id, $scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle = "订单中心 > 可接订单 > 订单详情";
                $scope.orderDetail = publicService.changeOrderData(data.msg_body.order);
                $scope.State = "detail";
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

    $scope.turnToIndex = function () {
        $scope.State = "index";
        $scope.titleObj.Tiptitle = "订单中心 > 可接订单";
    }

    $scope.RecieveOrder = function (id) {
        $scope.submitObj = {
            id: id,
            type: "a10",
            content: "",
            session_id: $scope.session_id
        }
        layer.confirm('确定接单吗？', function (i) {
            var promise = gudieService.editOrder($scope.submitObj);
            promise.then(function (data) {
                if (data.err_code == 0) {
                    layer.closeAll();
                    layer.msg("接单成功", {icon: 1, time: 1000});
                    $scope.State = 'index';
                    $scope.init();
                } else {
                    layer.msg(data.err_msg, {icon: 0});
                }
            }, function (data) {
                layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
            });
            promise.catch(function () {
                layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
            })
        });

    }

    //关闭弹窗
    $scope.closeAlert = function () {
        layer.closeAll();
    }

}]);

//正在进行订单控制器
Ctrl.controller("OrderNowCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "gudieService", "publicService", function ($scope, $http, $sce, $state, $stateParams, gudieService, publicService) {
    $scope.State = "index";
    //初始化星星
    $scope.orderDetail = {
        star: 1
    };


    //预定义提交对象
    $scope.submitObj = {
        id: "",
        type: "",
        content: "",
        star: 3,
        session_id: $scope.session_id
    }

    $scope.orderObj = {
        type: 20,
        title: "",
        order_type: "1",
        page: 1,
        page_size: 5,
        session_id: $scope.session_id
    }

    //排序字段搜索
    $scope.OrdertypeChange = function () {
        $scope.orderObj.page = 1;
        $scope.init();
    }

    //文本搜索
    $scope.initText = function () {
        $scope.orderObj.page = 1;
        $scope.init();
    }

    //键盘搜索事件
    $scope.searchKey = function(e) {
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.initText();
        }
    }

    $scope.pageChanged = function () {
        $scope.init();
    }

    $scope.typeChange = function (type) {
        $scope.orderObj.page = 1;
        $scope.orderObj.type = type;
        $scope.init();
    }

    $scope.init = function () {
        var promise = gudieService.getorderList($scope.orderObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle = "订单中心 > 进行中";
                $scope.orderList = data.msg_body.order;
                $scope.orderCount = data.msg_body;
                switch ($scope.orderObj.type) {
                    case 20:
                        $scope.totalItems = $scope.orderCount.type_20_count;
                        break;
                    case 21:
                        $scope.totalItems = $scope.orderCount.type_21_count;
                        break;
                    case 22:
                        $scope.totalItems = $scope.orderCount.type_22_count;
                        break;
                    case 23:
                        $scope.totalItems = $scope.orderCount.type_23_count;
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

    $scope.turnToDetail = function (id) {
        var promise = gudieService.getorderDetail(id, $scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                switch ($scope.orderObj.type) {
                    case 20:
                        $scope.titleObj.Tiptitle = "订单中心 > 进行中 > 待确认 > 查看详情";
                        break;
                    case 21:
                        $scope.titleObj.Tiptitle = "订单中心 > 进行中 > 待出团 > 查看详情";
                        break;
                    case 22:
                        $scope.titleObj.Tiptitle = "订单中心 > 进行中 > 出团中 > 查看详情";
                        break;
                    case 23:
                        $scope.titleObj.Tiptitle = "订单中心 > 进行中 > 待结束 > 查看详情";
                        break;
                    default:
                        break;
                }
                $scope.orderDetail = publicService.changeOrderData(data.msg_body.order);
                $scope.State = "detail";
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

    $scope.turnToIndex = function () {
        $scope.State = "index";
        $scope.titleObj.Tiptitle = "订单中心 > 进行中";
    }

    //关闭订单
    $scope.CancelOrderAlert = function (id) {
        //预定义提交对象
        $scope.submitObj = {
            id: id,
            type: "a29",
            content: "",
            session_id: $scope.session_id
        }

        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            anim: 2,
            area: ["450px", "420px"],
            shadeClose: true,
            content: $(".cancel-order-alert")
        });
    }

    $scope.CancelOrder = function (id) {
        if ($scope.orderObj.type == 21 && $scope.submitObj.content == "") {
            layer.msg("请填写取消订单的理由", {icon: 0, time: 1000});
            return true;
        }
        var promise = gudieService.editOrder($scope.submitObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.closeAll();
                layer.msg("操作成功", {icon: 1, time: 1000});
                $scope.State = 'index';
                $scope.init();
            } else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function () {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
    }

    $scope.EndOrderAlert = function (id) {
        //预定义提交对象
        $scope.submitObj = {
            id: id,
            type: "a30",
            content: "",
            star: 3,
            session_id: $scope.session_id
        }

        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            anim: 2,
            area: ["450px", "340px"],
            shadeClose: true,
            content: $(".end-order-alert")
        });

    }

    $scope.EndOrder = function () {
        if ($scope.submitObj.star < 3 && $scope.submitObj.content.length == 0) {
            layer.msg("您的评价低于3星，请叙述理由", {icon: 0})
        } else {
            var promise = gudieService.editOrder($scope.submitObj);
            promise.then(function (data) {
                if (data.err_code == 0) {
                    layer.closeAll();
                    layer.msg("操作成功", {icon: 1, time: 1000});
                    $scope.State = 'index';
                    $scope.init();
                } else {
                    layer.msg(data.err_msg, {icon: 0});
                }
            }, function (data) {
                layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
            });
            promise.catch(function () {
                layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
            })
        }
    }

    //关闭弹窗
    $scope.closeAlert = function () {
        layer.closeAll();
    };

    //判断跳转
    var turnType = $stateParams.type;
    var turnId = $stateParams.id;

    if (turnType != "") {
        //为51进入待出团界面
        if (turnType == 51) {
            $scope.orderObj.type = 20;
            $scope.ShowDetail(turnId);
        }
        //为52进入出团中界面
        if (turnType == 52) {
            $scope.orderObj.type = 21;
            $scope.ShowDetail(turnId);
        }
        //为53进入待支付界面
        if (turnType == 53) {
            $scope.orderObj.type = 22;
            $scope.ShowDetail(turnId);
        }
        //为30进入已完成界面
        if (turnType = 30) {
            $scope.orderObj.type = 23;
            $scope.ShowDetail(turnId);
        }
    }


}]);

//结束订单控制器
Ctrl.controller("OrderEndCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "gudieService", "publicService", function ($scope, $http, $sce, $state, $stateParams, gudieService, publicService) {

    $scope.State = "index";

    $scope.orderObj = {
        type: 30,
        title: "",
        order_type: "1",
        page: 1,
        page_size: 5,
        session_id: $scope.session_id
    }

    $scope.pageChanged = function () {
        $scope.init();
    }

    //排序字段搜索
    $scope.OrdertypeChange = function () {
        $scope.orderObj.page = 1;
        $scope.init();
    }
    //文本搜索
    $scope.initText = function () {
        $scope.orderObj.page = 1;
        $scope.init();
    }

    //键盘搜索事件
    $scope.searchKey = function(e) {
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.initText();
        }
    }
    $scope.init = function () {
        var promise = gudieService.getorderList($scope.orderObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle = "订单中心 > 已完成";
                $scope.orderList = data.msg_body.order;
                $scope.totalItems = data.msg_body.type_30_count;
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

    $scope.turnToDetail = function (id) {
        var promise = gudieService.getorderDetail(id, $scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle = "订单中心 > 已完成 > 查看详情";
                $scope.orderDetail = publicService.changeOrderData(data.msg_body.order);
                $scope.State = "detail";
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

    $scope.turnToIndex = function () {
        $scope.State = "index";
        $scope.titleObj.Tiptitle = "订单中心 > 已完成";
    }

    //判断跳转
    var turnType = $stateParams.type;
    var turnId = $stateParams.id;

    if (turnType != "") {
        $scope.ShowDetail(turnId);
    }

}]);

//投诉中心控制器
Ctrl.controller("guideComplaintCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "gudieService", function ($scope, $http, $sce, $state, $stateParams, gudieService) {

    $scope.complainObj =
    {
        "complain_type": 1,
        "content": "",
        "content_file": [],
        "complain_mobile": "",
        "session_id": $scope.session_id
    }

    $scope.AddComplain = function () {
        if ($scope.complainObj.content.length > 500 || $scope.complainObj.content.length == 0) {
            layer.msg("投诉或建议为必填项，且少于500字", {icon: 0});
            return true;
        }

        if ($scope.complainObj.complain_mobile.length == 0) {
            layer.msg("请填写联系方式", {icon: 0});
            return true;
        }

        var promise = gudieService.addComplian($scope.complainObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.msg("提交成功", {icon: 1})
                $scope.complainObj =
                {
                    "complain_type": 1,
                    "content": "",
                    "content_file": [],
                    "complain_mobile": "",
                    "session_id": $scope.session_id
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

    //图片上传
    $scope.file_changed = function (element) {
        if ($scope.complainObj.content_file.length > 2) {
            layer.msg("只能上传三张图片", {icon: 0})
        } else {
            var ele_id = angular.element(element).attr("id")
            var uuid = $ui.fileupload({
                fileSelector: '#' + ele_id,
                //fileSelector: '#contentFile',
                type: FILETYPE.IMAGE,
                moudle: 'BASE'
            }).uuid;
            $scope.$apply(function () {
                $scope.complainObj.content_file.push({
                    id: uuid
                })
            })
        }
    };

    //删除图片
    $scope.delPic = function (id) {
        if ($scope.complainObj.content_file.length > 0) {
            var index = -1;
            angular.forEach($scope.complainObj.content_file, function (item, key) {
                if (item.id == id) {
                    index = key;
                }
            });
            if (index != -1) {
                $scope.complainObj.content_file.splice(index, 1)
            }
        }
    }

    //图片展示
    $scope.showPic = function (url) {
        $scope.showPicUrl = $scope.ResUrl + url;
        layer.open({
            type: 1,
            title: "查看图片",
            shade: 0.3,
            area: ["800px", "600px"],
            content: $('.picArea')
        });
    }


}]);

//投诉中心控制器
Ctrl.controller("JoinUsCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "$cookieStore", "gudieService", function ($scope, $http, $sce, $state, $stateParams,$cookieStore, gudieService) {

    $scope.titleObj.Tiptitle = "加入我们";
    $scope.step = 1;

    $scope.InfoObj = {
        file: [],
        session_id: $scope.session_id
    }

    $scope.DownaAreement = function () {
        $scope.step = 2;
    }

    $scope.NextStep = function (step) {
        $scope.step = step;
    }
    $scope.turnToCenter = function () {
        $state.go("guideClient.guideEdit");
    }

    //上传文件
    $scope.file_changed = function (element) {

        var ele_id = angular.element(element).attr("id")
        var uuid = $ui.fileupload({
            fileSelector: '#' + ele_id,
            type: FILETYPE.IMAGE,
            moudle: 'BASE'
        }).uuid;

        $scope.$apply(function () {
            ////插入一个对象
            //var li = document.createElement('li');
            //li.innerHTML = '<li></li><img src="' + ($scope.ResUrl + uuid) + '"></li>';
            //tt.append(li);
            $scope.InfoObj.file.push({
                file_id: uuid
            });
        })
    };

    $scope.submitCheck = function () {

        if($scope.InfoObj.file.length!=2){
            layer.msg("请上传两张图片", {icon: 0});
            return true;
        }

        var promise = gudieService.submitCheck($scope.InfoObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.msg(data.err_msg, {icon: 1})
                $scope.turnToCenter();
            }else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
    }

    //删除图片
    $scope.delPic = function (id) {
        if ($scope.InfoObj.file.length > 0) {
            var index = -1;
            angular.forEach($scope.InfoObj.file, function (item, key) {
                if (item.file_id == id) {
                    index = key;
                }
            });
            if (index != -1) {
                $scope.InfoObj.file.splice(index, 1)
            }
        }
    }

    //图片展示
    $scope.showPic = function (url) {
        $scope.showPicUrl = $scope.ResUrl + url;
        layer.open({
            type: 1,
            title: "查看图片",
            shade: 0.3,
            area: ["800px", "600px"],
            content: $('.picArea')
        });
    }

}]);
