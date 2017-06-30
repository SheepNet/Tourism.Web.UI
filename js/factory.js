Ctrl.factory("loginService",["$http", "$q","Md5",function ($http,$q,Md5) {
    return{
        //登录
        login:function (user_id,password) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/base/user/login',{params:{user_id:user_id,password: Md5.hex_md5(password)}}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //发送信息
        send_sms:function(mobile){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(Url+'travel/base/send_sms',{mobile:mobile}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //重置密码
        setup_password:function(mobile,code,password){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(Url+'travel/base/user/setup_password',{mobile:mobile,code:code,password: Md5.hex_md5(password)}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //注册
        register:function(mobile,code,password){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(Url+'travel/base/user/register',{mobile:mobile,code:code,password: Md5.hex_md5(password)}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        }
    }
}]);

Ctrl.factory("photoService", [
    function () {
        return {
            setPhoto: function (type) {
                var Photo = "";
                    switch (type) {
                        case 10:
                            Photo = "images/state02.png";
                            break;
                    }
                return Photo;
            }
        }
    }]);

Ctrl.factory("centerService",["$http", "$q",function ($http,$q) {
    return{
        //获得消息中心信息
        getList:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/center/notify/list',{params:obj}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得审核界面列表
        getVerifyList:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/center/check/list',{params:obj}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得审核信息
        GetCheckDetail:function(id,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/center/check/query',{params:{id:id,session_id:session_id}}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //提交验证
        checkGuide:function(id,check_status,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(
                Url+'travel/center/check/check',
                {
                    id:id,
                    check_status:check_status,
                    session_id:session_id
                })
                .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得导游列表接口
        getGuideList:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/center/guide/list',{params:obj}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得导游详情
        getGuideDetail:function(id,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/center/guide/query',{params:{id:id,session_id:session_id}}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //升级导游为品牌导游
        editGuideInfo:function(id,type,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(
                    Url+'travel/center/guide/edit',
                {
                    id:id,
                    type:type,
                    session_id:session_id
                })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得导游带团记录
        getGuideHistory:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/center/guide/order/list',{params:obj}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得订单列表接口
        getOrderList:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/center/order/list',{params:obj})
                .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        getOrderDetail:function(id,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/center/order/query',{params:{id:id,session_id:session_id}})
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        editOrderState:function(id,type,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(Url+'travel/center/order/edit',{id:id,type:type,session_id:session_id})
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //完善信息
        completeMessage:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(
                Url+'travel/base/user/edit',obj)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //completeMessage:function(name,sex,address,guide_card_id,guide_card_id_photo,guide_card_no,guide_card_no_photo,session_id){
        //    var deferred = $q.defer();
        //    var promise = deferred.promise;
        //
        //    $http.post(
        //        Url+'travel/base/user/edit.json',
        //        {
        //            name:name,
        //            sex:sex,
        //            address:address,
        //            guide_card_id:guide_card_id,
        //            guide_card_id_photo:guide_card_id_photo,
        //            guide_card_no:guide_card_no,
        //            guide_card_no_photo:guide_card_no_photo,
        //            session_id:session_id
        //        })
        //        .success(function (data) {
        //            deferred.resolve(data);
        //        }).error(function (error) {
        //        deferred.reject(error);
        //    });
        //    return promise;
        //},
        //获得旅行社列表接口
        getAgencyList:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'	travel/center/travel_company/list',{params:obj}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得旅行社信息
        getAgencyInfo:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'	travel/center/travel_company/query',{params:obj}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得旅行社订单记录
        getAgencyHistory:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/center/travel_company/order/list',{params:obj}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //停用旅行社
        delAgency:function(id,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(
                    Url+'travel/center/travel_company/del',
                {
                    id:id,
                    session_id:session_id
                })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得投诉列表信息
        getComplainList:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'	travel/center/complain/list',{params:obj}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得投诉详情
        getComplainDetail:function(id,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'	travel/center/complain/query',{params:{id:id,session_id:session_id}}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //处理投诉信息
        editComplain:function(id,type,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(
                    Url+'travel/center/complain/edit',
                {
                    id:id,
                    type:type,
                    session_id:session_id
                })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        }
    }
}]);

Ctrl.factory("gudieService",["$http", "$q",function ($http,$q) {
    return{
        //获得导游详情
        getGudieInfo:function(session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/guide/guide/query',{params:{session_id:session_id}}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
            //http://chinaz.live/travel/guide/guide/query?
        },
        //获得订单详情
        getorderList:function(orderObj){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http.get(Url+'	travel/guide/order/list',{params:orderObj}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得订单详细信息
        getorderDetail:function(id,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http.get(Url+'	travel/guide/order/query',{params:{id:id,session_id:session_id}}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //提交订单操作
        check:function(id,check_status,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(
                    Url+'travel/center/guide/check',
                {
                    id:id,
                    check_status:check_status,
                    session_id:session_id
                })
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //提交订单改
        editOrder:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(Url+'travel/guide/order/edit', obj)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //提交投诉
        addComplian:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(Url+'travel/guide/complain/add', obj)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        }
    }
}]);

Ctrl.factory("agencyService",["$http", "$q",function ($http,$q) {
    return{
        //获得订单列表
        getorderList:function(orderObj){
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http.get(Url+'	travel/travel_company/order/list',{params:orderObj}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得订单详情
        getOrderDetail:function(id,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'	travel/travel_company/order/query',{params:{id:id,session_id:session_id}}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得导游详情信息
        getGuideDetail:function(id,order_id,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'	travel/travel_company/guide/query',{params:{id:id,order_id:order_id,session_id:session_id}}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //发布订单
        addOrder:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(Url+'travel/travel_company/order/add', obj)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //编辑订单
        editOrder:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(Url+'travel/travel_company/order/edit', obj)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        }
    }
}]);

Ctrl.factory("publicService",["$http", "$q",function ($http,$q) {
    return{
        //检查时间大小
        checkEndTime:function(startTime,endTime){
            var start=new Date(startTime.replace("-", "/").replace("-", "/"));
            var end=new Date(endTime.replace("-", "/").replace("-", "/"));
            if(end<start){
                return false;
            }
            return true;
        },
        //获得学历列表
        getStudentLevelList:function(){
            return [
                {
                    key: 0,
                    name: "无要求"
                },
                {
                    key: 1,
                    name: "初中"
                },
                {
                    key: 2,
                    name: "高中"
                },
                {
                    key: 3,
                    name: "大专"
                },
                {
                    key: 4,
                    name: "本科"
                },
                {
                    key: 5,
                    name: "硕士"
                },
                {
                    key: 6,
                    name: "硕士"
                }
            ]
        },
        //获得语言列表
        getLanguageList:function(){
            return [
                "汉语", "英语", "韩语","日语", "法语", "俄语"
            ];
        },
        //处理需要转换的订单数据
        changeOrderData:function(order){
            var studentLevelList=this.getStudentLevelList();
            order.language=angular.fromJson(order.language);
            if(isNaN(order.study_level)){
                order.study_level="无要求";
            }else {
                order.study_level=studentLevelList[order.study_level].name;
            }
            return order;
        },
        //处理获得对应的图片和类名
        getRightInfo:function(infoList){
            var list=[];
            angular.forEach(infoList,function(item,key){
                switch (item.type) {
                    //导服中心部分
                    case 32:
                        item.ClassName = "color-02";
                        item.Image="images/state02.png";
                        break;
                    case 36:
                    case 37:
                        item.ClassName = "color-03";
                        item.Image="images/state03.png";
                        break;
                    case 41:
                        item.ClassName = "color-04";
                        item.Image="images/state04.png";
                        break;
                    case 61:
                        item.ClassName = "color-05";
                        item.Image="images/state05.png";
                        break;
                    //导游端
                    case 21:
                        item.ClassName = "color-01";
                        item.Image="images/state01.png";
                        break;
                    default:
                        break;
                }
                list.push(item)
            })
            return list;
        }
    }
}]);
