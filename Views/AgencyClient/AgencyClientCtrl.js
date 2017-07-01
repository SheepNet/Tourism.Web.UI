/**
 * Created by qscqs on 2017/5/31.
 */
//主界面控制器
Ctrl.controller("AgencyClientCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "$cookieStore", "$location", function ($scope, $http, $sce, $state, $stateParams, $cookieStore, $location) {
    var userMessage = $cookieStore.get("user_agency");
    $scope.ResUrl=rurl+"/resource/";
    $scope.session_id = $cookieStore.get("session_id_agency");
    if (userMessage == null) {
        $location.path("index")
    }
    $scope.User = userMessage;

    //标题信息
    $scope.titleObj={
        Tiptitle:"消息中心"
    }

    $scope.changeTitle=function(title){
        $scope.titleObj.Tiptitle=title;
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

    $state.go("agencyClient.agencyInfoCenter");
}]);

//消息中心控制器
Ctrl.controller("AgencyInfoCenterCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams","centerService","publicService", function ($scope, $http, $sce, $state, $stateParams,centerService,publicService) {

    $scope.InfoObj={
        type:"31,29,37,20,51,52,53,30",
        title:"",
        begin_date:"",
        end_date:"",
        page:1,
        page_size:10,
        session_id:$scope.session_id
    }


    $scope.pageChanged = function () {
        $scope.init();
    }
    $scope.init = function () {
        var promise = centerService.getList($scope.InfoObj);
        promise.then(function (data) {
            $scope.totalItems = data.msg_body.total_count;
            $scope.infoList = publicService.getRightInfo(data.msg_body.notify);
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

    $scope.turnToDetail=function(type,id){
        switch (type){
            //转向个人中心
            case 31:
                $state.go("agencyClient.agencyEdit");
                break;
            // 转向正在进行订单
            case 29:
            case 37:
            case 20:
            case 51:
            case 52:
            case 53:
                $state.go("agencyClient.orderNowAgency", {"type": type,"id":id});
                break;
            //转向已完成订单
            case 30:
                $state.go("agencyClient.orderEndAgency", {"type": type,"id":id});
                break;
            default:
                break;
        }
    }

    $scope.init();
}]);

//个人信息中心控制器
Ctrl.controller("AgencyEditCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams","agencyService", function ($scope, $http, $sce, $state, $stateParams,agencyService) {

    $scope.init = function () {
        var promise = agencyService.getAgencyInfo($scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle="个人中心";
                $scope.agencyInfo = data.msg_body.travel_company;
                //预处理一些格式
                $scope.agencyInfo.come="agency";
                $scope.agencyInfo.sum_normal_num=0;
                $scope.agencyInfo.sum_num=0;
                angular.forEach($scope.agencyInfo.parter,function(item,key){
                    $scope.agencyInfo.sum_normal_num+=item.normal_num;
                    $scope.agencyInfo.sum_num+=item.num;
                })
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

//订单详情界面
Ctrl.controller("OrderDetailAgencyCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", function ($scope, $http, $sce, $state, $stateParams) {
    //$state.go("agencyClient.agencyInfoCenter");
}]);

//结束订单控制器
Ctrl.controller("OrderEndAgencyCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "publicService", "agencyService", function ($scope, $http, $sce, $state, $stateParams,publicService,agencyService) {

    $scope.State = "index";

    $scope.orderObj = {
        type: 30,
        title: "",
        order_type: "1",
        page: 1,
        page_size: 5,
        session_id: $scope.session_id
    };

    //排序类型搜索
    $scope.OrdertypeChange = function () {
        $scope.orderObj.page=1;
        $scope.init();
    }

    //文本搜索
    $scope.initText=function(){
        $scope.orderObj.page=1;
        $scope.init();
    }

    $scope.pageChanged = function () {
        $scope.init();
    }

    $scope.init = function () {
        var promise = agencyService.getorderList($scope.orderObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle="订单中心 > 已完成";
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

    //查看详情
    $scope.ShowDetail = function (id) {
        $scope.State = "detail";
        var promise = agencyService.getOrderDetail(id, $scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle="订单中心 > 已完成 > 查看详情";
                $scope.orderDetail = publicService.changeOrderData(data.msg_body.order);
                $scope.guideList = [];
                angular.forEach($scope.orderDetail.guide, function (item, key) {
                    var promiseGetGuide = agencyService.getGuideDetail(item.id, $scope.orderDetail.id, $scope.session_id);
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
    };

    $scope.turnToIndex = function () {
        $scope.State = "index";
        $scope.titleObj.Tiptitle="订单中心 > 已完成";
    }

    //判断跳转
    var turnType=$stateParams.type;
    var turnId=$stateParams.id;
    if(turnType!=""){
        //为51进入待出团界面
        if(turnType==30){
            $scope.ShowDetail(turnId);
        }
    }

}]);

//正在进行订单控制器
Ctrl.controller("OrderNowAgencyCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "publicService", "agencyService", function ($scope, $http, $sce, $state, $stateParams, publicService, agencyService) {
    $scope.State = "index";

    $scope.publicOrder = function () {
        $state.go("agencyClient.orderPublishAgency");
    }

    $scope.orderObj = {
        type: 20,
        title: "",
        order_type: "1",
        page: 1,
        page_size: 5,
        session_id: $scope.session_id
    };

    //学历列表
    $scope.study_levelList = publicService.getStudentLevelList();
    //语言列表
    $scope.languageSelList = publicService.getLanguageList();

    //置顶对象预处理

    //排序类型搜索
    $scope.OrdertypeChange = function () {
        $scope.orderObj.page=1;
        $scope.init();
    }

    //文本搜索
    $scope.initText=function(){
        $scope.orderObj.page=1;
        $scope.init();
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
        var promise = agencyService.getorderList($scope.orderObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                $scope.titleObj.Tiptitle="订单中心 > 进行中";
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

    $scope.ShowDetail = function (id) {
        $scope.State = "detail";
        var promise = agencyService.getOrderDetail(id, $scope.session_id);
        promise.then(function (data) {
            if (data.err_code == 0) {
                switch ($scope.orderObj.type) {
                    case 20:
                        $scope.titleObj.Tiptitle="订单中心 > 进行中 > 待确认 > 查看详情";
                        break;
                    case 21:
                        $scope.titleObj.Tiptitle="订单中心 > 进行中 > 待出团 > 查看详情";
                        break;
                    case 22:
                        $scope.titleObj.Tiptitle="订单中心 > 进行中 > 出团中 > 查看详情";
                        break;
                    case 23:
                        $scope.titleObj.Tiptitle="订单中心 > 进行中 > 待结束 > 查看详情";
                        break;
                    default:
                        break;
                }
                $scope.orderDetail = publicService.changeOrderData(data.msg_body.order);
                $scope.guideList = [];
                angular.forEach($scope.orderDetail.guide, function (item, key) {
                    var promiseGetGuide = agencyService.getGuideDetail(item.id, id, $scope.session_id);
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
    };

    $scope.ChangeStatus = function (key) {
        if ($scope.guideList[key].status == 0) {
            $scope.guideList[key].status = 1
        } else {
            $scope.guideList[key].status = 0;
        }
    }

    $scope.turnToIndex = function () {
        $scope.State = "index";
        $scope.titleObj.Tiptitle="订单中心 > 进行中";
    }

    //待确认界面，点击弹出窗口
    $scope.ConfirmAlert = function () {
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            anim: 2,
            area: ["450px", "330px"],
            shadeClose: true,
            content: $(".comfirm-order-alert")
        });
    }

    //待确认界面，弹窗界面点击确认
    $scope.ConfirmOrder = function () {
        var obj = {
            id: $scope.orderDetail.id,
            type: "t20",
            guide: [],
            session_id: $scope.session_id
        }
        angular.forEach($scope.guideList, function (item, key) {
            if (item.status == 1) {
                obj.guide.push({
                    id: item.id
                })
            }
        });
        var promise = agencyService.editOrder(obj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.closeAll();
                layer.msg("提交成功", {icon: 1, time: 1000});
                $scope.State = "index";
                $scope.init();

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

    //待出团界面，关闭弹窗弹出方法
    $scope.CloseOrderAlert = function () {
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            anim: 2,
            area: ["450px", "420px"],
            shadeClose: true,
            content: $(".close-order-alert")
        });
    }

    //待出团界面，关闭订单弹窗点击确认
    $scope.CloseOrder = function () {
        var obj = {
            id: $scope.orderDetail.id,
            type: "t36",
            content: $scope.closeContent,
            session_id: $scope.session_id
        }

        var promise = agencyService.editOrder(obj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.closeAll();
                layer.msg("提交成功", {icon: 1, time: 1000});
                $scope.State = "index";
                $scope.init();
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

    //待出团界面，置顶弹窗弹出方法
    $scope.TopOrderAlert = function () {
        $scope.TopObj = {
            id: $scope.orderDetail.id,
            type: "t26",
            star: 0,
            guide_sex: 0,
            guide_level: 0,
            star: 0,
            language: [],
            study_level: 0,
            session_id: $scope.session_id,
        }
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            anim: 2,
            area: ["650px", "500px"],
            shadeClose: true,
            content: $(".top-order-alert")
        });
    }

    //待出团界面，置顶第二步弹窗弹出方法
    $scope.TopOrder = function () {
        //验证表格以及信息是否完整
        if ($scope.TopForm.$invalid || $scope.TopObj.guide_money > 10000 || $scope.TopObj.guide_num > 100) {
            layer.msg("请根据要求输入信息", {icon: 0});
            return true;
        }

        $scope.topIndex = layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            anim: 2,
            area: ["450px", "330px"],
            shadeClose: true,
            content: $(".top-order-alert-next")
        });
    }

    //待出团界面，置顶订单确认
    $scope.TopOrderNext = function () {
        var promise = agencyService.editOrder($scope.TopObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.closeAll();
                layer.msg("提交成功", {icon: 1, time: 1000});
                $scope.State = "index";
                $scope.init();
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

    //关闭置顶订单第二层提示框
    $scope.closeAlertNext = function () {
        layer.close($scope.topIndex);
    }

    //待结束界面，关闭订单弹窗点击确认
    $scope.EndOrderAlert = function () {

        //设置要提交的对象
        $scope.EndObj = {
            id: $scope.orderDetail.id,
            type: 31,
            guide: [],
            session_id: $scope.session_id
        };

        //中转对象，因为对象格式有偏差
        $scope.guideEndList = [];

        //从导游列表中抓出对应的数据
        angular.forEach($scope.guideList, function (item, key) {
            if (item.status == 1) {
                $scope.guideEndList.push({
                    id: item.id,
                    name: item.name,
                    photo: item.photo,
                    star: 3,
                    content: ""
                })
            }
        })

        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            anim: 2,
            area: ["450px", "520px"],
            shadeClose: true,
            content: $(".end-order-alert")
        });


    }
    //待出团界面，结束行程，评价确认
    $scope.EndOrder = function () {
        //设置提交对象的guide
        var flag = true;
        angular.forEach($scope.guideEndList, function (item, key) {
            $scope.EndObj.guide.push({
                id: item.id,
                star: item.star,
                content: item.content
            })
            if (item.star < 3 && item.content.length==0) {
                flag = false;
            }
        })

        if (flag) {
            var promise = agencyService.editOrder($scope.EndObj);
            promise.then(function (data) {
                if (data.err_code == 0) {
                    layer.closeAll();
                    layer.msg("提交成功", {icon: 1, time: 1000});
                    $scope.State = "index";
                    $scope.init();
                } else {
                    layer.msg(data.err_msg, {icon: 0});
                }
            }, function (data) {
                layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
            });
            promise.catch(function (data) {
                layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
            })
        }else {
            layer.msg("请对低于3星的导游进行评价", {icon: 0})
        }


    }

    //关闭弹窗
    $scope.closeAlert = function () {
        layer.closeAll();
    }

    //删除语言
    $scope.removelanguage = function (key) {
        $scope.TopObj.language.splice(key, 1)
    }

    //增加语言
    $scope.addLanguage = function (langSel) {
        var flag = true;
        angular.forEach($scope.TopObj.language, function (item, key) {
            if (item.language_name == langSel) {
                flag = false;
                return false;
            }
        });
        if (flag) {
            $scope.TopObj.language.push({
                "language_name": langSel
            })
        } else {
            layer.msg("此语言已经被选择", {icon: 0, time: 1000})
        }
    }

    //性别变化
    $scope.changeSex = function (sex) {
        $scope.TopObj.guide_sex = sex;
    }

    //需求变化
    $scope.changeRequire = function (level) {
        $scope.TopObj.guide_level = level;
    }

    //判断跳转
    var turnType=$stateParams.type;
    var turnId=$stateParams.id;
    if(turnType!=""){
        //为51进入待出团界面
        switch (turnType) {
            case 20:
                $scope.orderObj.type=20;

                break;
            case 29:
            case 37:
            case 51:
                $scope.orderObj.type=21;
                break;
            case 52:
                $scope.orderObj.type=22;
                break;
            case 53:
                $scope.orderObj.type=23;
                break;
            default:
                break;
        }
        $scope.ShowDetail(turnId);
    }

}]);

//订单发布控制器
Ctrl.controller("OrderPublishAgencyCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "$cookieStore", "publicService", "agencyService", function ($scope, $http, $sce, $state, $stateParams, $cookieStore, publicService, agencyService) {
    var userMessage = $cookieStore.get("user_agency");
    $scope.agencyName = userMessage.name;

    $scope.languageSelList = publicService.getLanguageList();

    $scope.study_levelList = publicService.getStudentLevelList();

    //设置默认信息
    $scope.InfoObj = {
        star: 0,
        language: [],
        guide_sex: 0,
        guide_level: 0,
        study_level: 0,
        session_id: $scope.session_id
    }

    //提交订单
    $scope.publishOrder = function () {


        //验证表格以及信息是否完整
        if ($scope.orderForm.$invalid || $scope.InfoObj.guide_money > 10000 || $scope.InfoObj.guide_num > 100) {
            layer.msg("请根据要求输入信息", {icon: 0});
            return true;
        }


        //验证结束时间是否大于开始时间
        if (!publicService.checkEndTime($scope.InfoObj.begin_time, $scope.InfoObj.end_time)) {
            layer.msg("旅行结束时间应大于开始时间", {icon: 0});
            return true;
        }

        //验证结束时间是否大于开始时间
        if (!publicService.checkEndTime($scope.InfoObj.enter_end_time, $scope.InfoObj.begin_time)) {
            layer.msg("应征截至时间应小于旅行开始时间", {icon: 0});
            return true;
        }


        var promise = agencyService.addOrder($scope.InfoObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.msg("发布成功", {icon: 1})
                $state.go("agencyClient.orderNowAgency");
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

    //删除语言
    $scope.removelanguage = function (key) {
        $scope.InfoObj.language.splice(key, 1)
    }

    //增加语言
    $scope.addLanguage = function (langSel) {
        var flag = true;
        angular.forEach($scope.InfoObj.language, function (item, key) {
            if (item.language_name == langSel) {
                flag = false;
                return false;
            }
        });
        if (flag) {
            $scope.InfoObj.language.push({
                "language_name": langSel
            })
        } else {
            layer.msg("此语言已经被选择", {icon: 0, time: 1000})
        }
    }

    //性别变化
    $scope.changeSex = function (sex) {
        $scope.InfoObj.guide_sex = sex;
    }

    //需求变化
    $scope.changeRequire = function (level) {
        $scope.InfoObj.guide_level = level;
    };

}]);

Ctrl.controller("AgencyComplaintCtrl", ["$scope", "$http", "$sce", "$state", "$stateParams", "gudieService", function ($scope, $http, $sce, $state, $stateParams, gudieService) {

    $scope.complainObj=
    {
        "complain_type": 1,
        "content": "",
        "content_file": [
        ],
        "complain_mobile": "",
        "session_id":$scope.session_id
    }

    $scope.AddComplain=function(){

        if($scope.complainObj.content.length>500 ||$scope.complainObj.content.length==0){
            layer.msg("投诉或建议为必填项，且少于500字", {icon: 0});
            return true;
        }

        if($scope.complainObj.complain_mobile.length==0){
            layer.msg("请填写联系方式", {icon: 0});
            return true;
        }

        var promise=gudieService.addComplian($scope.complainObj);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.msg("提交成功", {icon: 1})
                $scope.complainObj=
                {
                    "complain_type": 1,
                    "content": "",
                    "content_file": [
                    ],
                    "complain_mobile": "",
                    "session_id":$scope.session_id
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
    $scope.file_changed = function(element) {
            if($scope.complainObj.content_file.length>2){
                layer.msg("只能上传三张图片", {icon: 0})
            }else {
                var ele_id=angular.element(element).attr("id")
                var uuid = $ui.fileupload({
                    fileSelector: '#'+ele_id,
                    //fileSelector: '#contentFile',
                    type: FILETYPE.IMAGE,
                    moudle: 'BASE'
                }).uuid;
                $scope.$apply(function(){
                    $scope.complainObj.content_file.push({
                        id:uuid
                    })
                })
            }
    };

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

    //删除图片
    $scope.delPic=function(id){
        if($scope.complainObj.content_file.length>0){
            var index=-1;
            angular.forEach($scope.complainObj.content_file,function(item,key){
                if(item.id==id){
                    index=key;
                }
            });
            if(index1!=-1){
                $scope.complainObj.content_file.splice(index,1)
            }
        }
    }

}]);
