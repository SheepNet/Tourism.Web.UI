Ctrl.factory("loginService",["$http", "$q","Md5",function ($http,$q,Md5) {
    return{
        login:function (user_id,password) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/base/user/login.json',{params:{user_id:user_id,password: Md5.hex_md5(password)}}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        send_sms:function(mobile){
            var deferred = $q.defer();
            var promise = deferred.promise;
            //params:{user_id:user_id,password: Md5.hex_md5(password)}
            $http.post(Url+'travel/base/send_sms.json',{mobile:mobile}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        setup_password:function(mobile,code,password){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/base/user/setup_password.json',{params:{mobile:mobile,code:code,password: Md5.hex_md5(password)}}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        register:function(mobile,code,password){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(Url+'travel/base/user/setup_password.json',{params:{mobile:mobile,code:code,password: Md5.hex_md5(password)}}).success(function (data) {
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
        getList:function(title,begin_date,end_date,page,page_size,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            //params:{user_id:user_id,password: Md5.hex_md5(password)}
            $http.get(Url+'travel/center/notify/list'+page+'.json',{}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        getVerifyList:function(title,begin_date,end_date,page,page_size,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            //params:{user_id:user_id,password: Md5.hex_md5(password)}
            $http.get(Url+'travel/center/guide/list'+page+'.json',{}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        query:function(id,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            //params:{user_id:user_id,password: Md5.hex_md5(password)}
            $http.get(Url+'travel/center/guide/query.json',{id:id,session_id:session_id}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
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
        getOrderList:function(type,title,order_type,page,page_size,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.get(
                Url+'travel/center/order/list'+type+'.json',
                {
                    type:type,
                    title:title,
                    order_type:order_type,
                    page:page,
                    page_size:page_size,
                    session_id:session_id
                })
                .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        completeMessage:function(name,sex,address,guide_card_id,guide_card_id_photo,guide_card_no,guide_card_no_photo,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            //params:{user_id:user_id,password: Md5.hex_md5(password)}
            $http.post(
                Url+'travel/base/user/edit.json',
                {
                    name:name,
                    sex:sex,
                    address:address,
                    guide_card_id:guide_card_id,
                    guide_card_id_photo:guide_card_id_photo,
                    guide_card_no:guide_card_no,
                    guide_card_no_photo:guide_card_no_photo,
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
        getorderList:function(orderObj){
            var deferred = $q.defer();
            var promise = deferred.promise;
            //params:{user_id:user_id,password: Md5.hex_md5(password)}
            $http.get(Url+'	travel/guide/order/list'+orderObj.page+'.json',{params:orderObj}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        getorderDetail:function(id,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            //params:{user_id:user_id,password: Md5.hex_md5(password)}
            $http.get(Url+'	travel/guide/order/query.json',{params:{id:id,session_id:session_id}}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
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
    }
}]);
