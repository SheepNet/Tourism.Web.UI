/**
 * Created by YOUNG on 2017/5/30.
 */
//首页控制器

Ctrl.controller("ManageCenterCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "$cookieStore", "$location", function ($scope, $http, $sce, $state, $stateParams, $cookieStore, $location) {
    //获得user信息
    var userMessage = $cookieStore.get("user_manage");
    $scope.ResUrl=rurl+"/resource/";
    $scope.session_id =  $cookieStore.get("session_id_manage");
    if (userMessage == null) {
        $location.path("index")
    }
    $scope.User = userMessage;
    $state.go("manage.infoCenter");

    $scope.titleObj={
        Tiptitle:"消息中心"
    }

    $scope.changeTitle=function(title){
        $scope.titleObj.Tiptitle=title
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

}]);

//消息中心控制器
Ctrl.controller("InfoCenterCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", function ($scope, $http, $sce, $state, $stateParams) {

}]);

//审核中心
Ctrl.controller("VerifyCenterCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "$cookieStore", "centerService", function ($scope, $http, $sce, $state, $stateParams, $cookieStore, centerService) {
    $scope.State = 'index';

    $scope.reportData = [];

    $scope.InfoObj = {
        type: 0,
        title: "",
        begin_date: "",
        end_date: "",
        page: 1,
        page_size: 10,
        session_id: $scope.session_id
    }

    $scope.totalItems = 7;

    $scope.verifyList = [];


    $scope.typeChange = function (type) {
        $scope.InfoObj.page=1;
        $scope.InfoObj.type = type;
        $scope.init();
    }
    $scope.pageChanged = function () {
        $scope.init();
    }
    $scope.init = function () {
        var promise = centerService.getVerifyList($scope.InfoObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle="审核中心"
                $scope.type_0_count=data.msg_body.type_0_count;
                $scope.type_1_count=data.msg_body.type_1_count;
                if($scope.InfoObj.type==0){
                    $scope.totalItems = $scope.type_0_count;
                }else {
                    $scope.totalItems = $scope.type_1_count;
                }
                $scope.verifyList = data.msg_body.check;
                //$scope.verifyList = data.msg_body.data;
            }
            else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function () {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
    }
    $scope.init();

    var now_id = "";

    $scope.verifyGuide = function (id) {
        now_id = id;
        var promise = centerService.GetCheckDetail(id, $scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                if( $scope.InfoObj.type==0){
                    $scope.titleObj.Tiptitle="审核中心 > 查看详情"
                }else {
                    $scope.titleObj.Tiptitle="审核中心 > 已审核 > 查看详情"
                }
                $scope.guideInfo = data.msg_body.check;
                //$scope.guideInfo = data.msg_body.data;
                $scope.State = 'detail';
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

    //审核导游
    $scope.guideCheck = function (check_status) {
        var promise = centerService.checkGuide(now_id, check_status, $scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.msg("操作成功", {icon: 1})
                $scope.init();
                $scope.State = 'index';
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

    //图片展示
    $scope.showPic = function (url) {
        $scope.showPicUrl= $scope.ResUrl+url;
        layer.open({
            type: 1,
            shade: 0.3,
            title: false,
            content: $('.picArea')
        });
    }

    //回到首页
    $scope.turnToIndex = function () {
        $scope.State = 'index';
        $scope.titleObj.Tiptitle="审核中心";
    }
}]);

//订单中心
Ctrl.controller("OrderManageCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "centerService","publicService", function ($scope, $http, $sce, $state, $stateParams, centerService,publicService) {
    $scope.State = 'index';

    $scope.orderObj = {
        type: 1,
        title: "",
        order_type: "1",
        page: 1,
        page_size: 10,
        session_id: $scope.session_id
    }

    $scope.totalItems = 13;


    $scope.ShowDetail = function (id) {
        var promise = centerService.getOrderDetail(id,$scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                //设置标题信息
                switch ($scope.orderObj.type) {
                    case 1:
                        $scope.titleObj.Tiptitle="订单管理 > 待接";
                        break;
                    case 2:
                        $scope.titleObj.Tiptitle="订单管理 > 进行中";
                        break;
                    case 3:
                        $scope.titleObj.Tiptitle="订单管理 > 待支付";
                        break;
                    case 4:
                        $scope.titleObj.Tiptitle="订单管理 > 异常订单";
                        break;
                    case 5:
                        $scope.titleObj.Tiptitle="订单管理 > 已完成";
                        break;
                    default:
                        break;
                }
                $scope.orderDetail=publicService.changeOrderData(data.msg_body.order);
                $scope.guideList = [];
                angular.forEach($scope.orderDetail.guide, function (item, key) {
                    var promiseGetGuide = centerService.getGuideDetail(item.id, $scope.session_id);
                    promiseGetGuide.then(function (data) {
                        if (data.err_code == 0) {
                            var guideObj = data.msg_body.data;
                            guideObj.status = item.status;
                            $scope.guideList.push(guideObj)
                        } else {
                            layer.msg(data.err_msg, {icon: 0});
                        }
                    }, function (data) {
                        layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
                    });
                    promiseGetGuide.catch(function (data) {
                        layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
                    })
                })
                var guideList = $scope.orderDetail.guide;
                $scope.State="detail";
            }  else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
        $scope.State = 'detail';
    }

    $scope.typeChange = function (type) {
        $scope.orderObj.page = 1;
        $scope.orderObj.type = type;
        $scope.init();
    }

    $scope.pageChanged = function () {
        $scope.init();
    }
    $scope.init = function () {
        var promise = centerService.getOrderList($scope.orderObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle="订单管理";
                $scope.orderList = data.msg_body.order;
                $scope.orderCount = data.msg_body;
                switch ($scope.orderObj.type) {
                    case 1:
                        $scope.totalItems = $scope.orderCount.type_1_count;
                        break;
                    case 2:
                        $scope.totalItems = $scope.orderCount.type_2_count;
                        break;
                    case 3:
                        $scope.totalItems = $scope.orderCount.type_3_count;
                        break;
                    case 4:
                        $scope.totalItems = $scope.orderCount.type_4_count;
                        break;
                    case 5:
                        $scope.totalItems = $scope.orderCount.type_5_count;
                        break;
                    default:
                        break;
                }

            }  else {
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

    $scope.editOrder=function(){
        layer.confirm('确定设为已支付？', function (i) {
            var promise =  centerService.editOrderState($scope.orderDetail.id,35,$scope.session_id);
            promise.then(function (data) {
                if (data.err_code == 0) {
                    layer.closeAll();
                    layer.msg("操作成功", {icon: 1, time: 1000});
                    $scope.State="index";
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

    //回到首页
    $scope.turnToIndex = function () {
        $scope.State = 'index';
        $scope.titleObj.Tiptitle="订单管理";
    }


}]);

//导游管理
Ctrl.controller("GudieManageCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "centerService", function ($scope, $http, $sce, $state, $stateParams, centerService) {

    $scope.State = 'index';
    $scope.InfoObj = {
        title: "",
        begin_date: "",
        end_date: "",
        page: 1,
        page_size: 10,
        session_id: $scope.session_id
    };
    $scope.orderObj = {
        //id:$scope.guideInfo.id,
        title: "",
        order_type: 1,
        page: 1,
        page_size: 10,
        session_id: $scope.session_id
    }
    var now_id = "";

    //查看详情
    $scope.ShowDetail = function (id) {
        now_id = id;
        var promise = centerService.getGuideDetail(id, $scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle="导游管理 > 查看详情";
                $scope.guideInfo = data.msg_body.data;
                $scope.State = 'detail';
            }  else {
                layer.msg(data.err_msg, {icon: 0});
            }

        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
    }

    //历史记录
    $scope.ShowGudieHistory = function () {
        $scope.orderObj = {
            id: $scope.guideInfo.id,
            title: "",
            order_type: 1,
            page: 1,
            page_size: 10,
            session_id: $scope.session_id
        }
        $scope.initOrder();
        $scope.titleObj.Tiptitle="导游管理 > 查看详情 > 历史带团记录";
        $scope.State = 'history';
    }

    $scope.guideList = [];


    $scope.pageChanged = function () {
        $scope.init();
    }

    $scope.init = function () {
        var promise = centerService.getGuideList($scope.InfoObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle="导游管理";
                $scope.totalItems = data.msg_body.total_count;
                $scope.guideList = data.msg_body.guide;
            }
            else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function () {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
    }
    $scope.init();

    $scope.pageChangedOrder = function () {
        $scope.initOrder();
    }

    //导游历史纪录初始化列表
    $scope.initOrder = function () {
        var promise = centerService.getGuideHistory($scope.orderObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.totalItemsOrder = data.msg_body.total_count;
                $scope.orderList = data.msg_body.order;
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

    //升级或注销导游
    $scope.editGuideInfo = function (type) {
        var promise = centerService.editGuideInfo(now_id, type, $scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.msg("操作成功", {icon: 1})
                $scope.init();
                $scope.State = 'index';
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

    $scope.turnToIndex = function () {
        $scope.State = 'index';
        $scope.titleObj.Tiptitle="导游管理";
    }

    $scope.turnToDetail = function () {
        $scope.State = 'detail';
        $scope.titleObj.Tiptitle="导游管理 > 查看详情";
    }

    //图片展示
    $scope.showPic = function (url) {
        $scope.showPicUrl= $scope.ResUrl+url;
        layer.open({
            type: 1,
            title:"查看图片",
            shade: 0.3,
            area:["800px","600px"],
            content: $('.picArea')
        });
    }

}]);

//旅行社管理
Ctrl.controller("AgencyManageCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "centerService", function ($scope, $http, $sce, $state, $stateParams, centerService) {
    $scope.State = 'index';
    //初始化打星的分数
    $scope.agencyInfo = {
        star: 1
    };
    $scope.agencyObj = {
        title: "",
        begin_date: "",
        end_date: "",
        page: 1,
        page_size: 10,
        session_id: $scope.session_id
    };

    $scope.orderObj = {
        title: "",
        order_type: 1,
        page: 1,
        page_size: 10,
        session_id: $scope.session_id
    }

    $scope.agencyInfoObj = {
        id: "",
        page: 1,
        page_size: 10,
        session_id: $scope.session_id
    }

    $scope.ShowDetail = function (id) {
        $scope.State = 'detail';
        $scope.agencyInfoObj.id = id;
        var promise = centerService.getAgencyInfo($scope.agencyInfoObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle="旅行社管理 > 查看详情";
                $scope.totalItems1 = 5;
                $scope.agencyInfo = data.msg_body.travel_company;
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

    //查看旅行社历史记录
    $scope.ShowAgencyHistory = function () {
        $scope.orderObj = {
            id: $scope.agencyInfo.id,
            title: "",
            order_type: 1,
            page: 1,
            page_size: 5,
            session_id: $scope.session_id
        }
        $scope.initOrder();
        $scope.titleObj.Tiptitle="旅行社管理 > 查看详情 > 历史开团记录";
        $scope.State = 'history';
    }

    $scope.pageChanged = function () {
        $scope.init();
    }
    $scope.init = function () {
        var promise = centerService.getAgencyList($scope.agencyObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle="旅行社管理";
                $scope.totalItems = data.msg_body.total_count;
                $scope.agencyList = data.msg_body.travel_company;
            }  else {
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

    //导游历史纪录初始化列表
    $scope.initOrder = function () {
        var promise = centerService.getAgencyHistory($scope.orderObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.totalItemsOrder = data.msg_body.total_count;
                $scope.orderList = data.msg_body.order;
            } else {
                layer.msg(data.err_msg, {icon: 0});
            }
        }, function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
        promise.catch(function () {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        })
    };

    $scope.pageChangedOrder = function () {
        $scope.initOrder();
    }

    //停用旅行社
    $scope.DelAgency = function (id) {
        layer.confirm('确定停用该旅社吗？', function (i) {
            var promise = centerService.delAgency(id, $scope.session_id);
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
        });
    }

    //返回到详细页
    $scope.turnToDetail = function () {
        $scope.State = 'detail';
        $scope.titleObj.Tiptitle="旅行社管理 > 查看详情";
    }

    $scope.turnToIndex = function () {
        $scope.State = 'index';
        $scope.titleObj.Tiptitle="旅行社管理";
    }

}]);

//投诉中心
Ctrl.controller("ComplaintCenterCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "centerService", function ($scope, $http, $sce, $state, $stateParams, centerService) {

    //查询对象
    $scope.complainObj = {
        title: "",
        complain_type: 1,
        page: 1,
        page_size: 10,
        session_id: $scope.session_id
    }

    //默认显示首页
    $scope.State = 'index';

    //显示细节方法
    $scope.ShowDetail = function (id) {
        var promise = centerService.getComplainDetail(id, $scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle="投诉中心 > 查看详情";
                $scope.complainInfo = data.msg_body.complain;
                switch ($scope.complainInfo.complain_type) {
                    case 1:
                        $scope.complainInfo.complain_text = '旅行社服务';
                        break;
                    case 2:
                        $scope.complainInfo.complain_text  = '导游服务';
                        break;
                    case 3:
                        $scope.complainInfo.complain_text  = '景区环境';
                        break;
                    case 4:
                        $scope.complainInfo.complain_text  = '费用';
                        break;
                    case 5:
                        $scope.complainInfo.complain_text  = '其它';
                        break;
                    default:
                        $scope.complainInfo.complain_text  = '暂无';
                        break;
                }
                $scope.State = 'detail';
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

    //排序方式切换方法
    $scope.complainTypeChange = function () {
        $scope.init();
    }

    //换页方法
    $scope.pageChanged = function () {
        $scope.init();
    }

    //初始化表格数据
    $scope.init = function () {
        var promise = centerService.getComplainList($scope.complainObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle="投诉中心";
                $scope.totalItems = data.msg_body.total_count;
                $scope.complainList = data.msg_body.complain;
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

    $scope.editComplain = function (id, type) {
        var promise = centerService.editComplain(id, type, $scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.msg("操作成功", {icon: 1})
                $scope.init();
                $scope.State = 'index';
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
        $scope.showPicUrl= $scope.ResUrl+url;
        layer.open({
            type: 1,
            title:"查看图片",
            shade: 0.3,
            area:["800px","600px"],
            content: $('.picArea')
        });
    }

    $scope.turnToIndex = function () {
        $scope.State = 'index';
        $scope.titleObj.Tiptitle="投诉中心";
    }


}]);

//短信设置
Ctrl.controller("MessageSettingCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", function ($scope, $http, $sce, $state, $stateParams) {
    $scope.State = 'index';
    $scope.AddSetting = function () {
        $scope.State = 'detail';
    }
    $scope.BackIndex = function () {
        $scope.State = 'index';
    }
}]);

