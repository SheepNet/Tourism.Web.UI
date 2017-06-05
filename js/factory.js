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
            $http.post(Url+'travel/center/guide/check.json',{mobile:mobile}).success(function (data) {
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
            $http.get(Url+'travel/center/guide/query.json',{}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        },
        check:function(id,check_status,session_id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            //params:{user_id:user_id,password: Md5.hex_md5(password)}
            $http.post(Url+'travel/center/guide/check.json',{id:id,check_status:check_status,session_id:session_id}).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        }
    }
}]);
