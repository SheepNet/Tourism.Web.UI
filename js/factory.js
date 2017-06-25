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
            $http.get(Url+'travel/center/notify/list'+obj.page+'.json',{params:obj}).success(function (data) {
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
            $http.get(Url+'travel/center/guide/list'+obj.page+'.json',{params:obj}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        //获得导游详情
        getGuideDetail:function(obj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/center/guide/query.json',{params:obj}).success(function (data) {
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
                    Url+'travel/center/check/check.json',
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
            $http.get(Url+'travel/center/guide/order/list'+obj.page+'.json',{params:obj}).success(function (data) {
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
            $http.get(Url+'travel/center/order/list'+obj.type+'.json',{params:obj})
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
            $http.get(Url+'	travel/center/travel_company/list'+obj.page+'.json',{params:obj}).success(function (data) {
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
            $http.get(Url+'	travel/center/travel_company/query'+obj.page+'.json',{params:obj}).success(function (data) {
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
            $http.get(Url+'travel/center/travel_company/order/list'+obj.page+'.json',{params:obj}).success(function (data) {
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
                    Url+'travel/center/travel_company/del.json',
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
            $http.get(Url+'	travel/center/complain/list'+obj.page+'.json',{params:obj}).success(function (data) {
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
            $http.get(Url+'	travel/center/complain/query.json',{params:{id:id,session_id:session_id}}).success(function (data) {
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
                    Url+'travel/center/complain/edit.json',
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

            $http.get(Url+'	travel/guide/order/list'+orderObj.type+'.json',{params:orderObj}).success(function (data) {
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

            $http.get(Url+'	travel/guide/order/query.json',{params:{id:id,session_id:session_id}}).success(function (data) {
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
                    Url+'travel/center/guide/check.json',
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
            $http.post(Url+'travel/guide/order/edit.json', obj)
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
            $http.post(Url+'travel/center/complain/add.json', obj)
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

            $http.get(Url+'	travel/travel_company/order/list'+orderObj.type+'.json',{params:orderObj}).success(function (data) {
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
            $http.get(Url+'	travel/travel_company/order/query.json',{params:{id:id,session_id:session_id}}).success(function (data) {
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
            $http.get(Url+'	travel/travel_company/guide/query.json',{params:{id:id,session_id:session_id}}).success(function (data) {
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
            $http.post(Url+'travel/travel_company/order/add.json', obj)
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
            $http.post(Url+'travel/travel_company/order/edit.json', obj)
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
                "中文", "英文", "日文", "法文", "西班牙"
            ];
        }
    }
}]);
