//登录界面控制器
Ctrl.controller("LoginController", ["$scope","$http","$sce","$state","loginService","$cookieStore",function ($scope, $http, $sce,$state,loginService,$cookieStore) {
    $scope.login=function(){
        loginService.login($scope.user_id,$scope.password).then(function(data){
            if(data.err_code==0){
                $cookieStore.put("session_id",data.msg_body.session_id);
                var userMessage=data.msg_body.user;
                var turnUrl="";
                if(userMessage.type==1){
                    turnUrl='guideClient';
                }
                if(userMessage.type==2){
                    turnUrl='agencyClient';
                }
                if(userMessage.type==3){
                    turnUrl='manage';
                }
                $cookieStore.put("user",userMessage);
                $state.go(turnUrl);
            }else {
                layer.msg(data.err_msg);
            }

        },function(error){
            layer.msg("系统或网络异常,请稍后再尝试!")
        }).catch(function(data){
                layer.msg("系统或网络异常,请稍后再尝试!")
            });
    }
}]);

Ctrl.controller("Reset1Controller", ["$scope","$http","$sce","$state","$stateParams","loginService","$interval",function ($scope, $http, $sce,$state,$stateParams,loginService,$interval) {

    $scope.tipMessage="获取验证码";
    $scope.SendMessage=function(){
        $interval.cancel($scope.timer);
        var promise=loginService.send_sms($scope.mobile);
        promise.then(function(data){
            if(data.err_code==0){
                var time=60;
                $scope.timer = $interval(function () {
                    if(time>0){
                        $scope.tipMessage=time+"秒后失效";
                        time--;
                    }else {
                        $interval.cancel($scope.timer);
                        $scope.tipMessage="获取验证码";
                    }

                }, 1000);

            }else {
                layer.msg(data.err_msg);
            }

        })
    }
    $scope.ResetPassword=function(){
        $interval.cancel($scope.timer);
        $scope.tipMessage="获取验证码";
    }
}]);

Ctrl.controller("Reset2Controller", ["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    console.log($stateParams.test);
}]);