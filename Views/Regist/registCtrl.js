//登录界面控制器
Ctrl.controller("RegistController", ["$scope", "$http", "$sce", "$state", "loginService", "$cookieStore", "$interval", function ($scope, $http, $sce, $state, loginService, $cookieStore,$interval) {
    $scope.agreeState=false;
    $scope.tipMessage = "获取验证码";

    $scope.SendMessage = function () {
        $interval.cancel($scope.timer);
        var promise = loginService.send_sms($scope.mobile);
        promise.then(function (data) {
            if (data.err_code == 0) {
                var time = 60;
                $scope.timer = $interval(function () {
                    if (time > 0) {
                        $scope.tipMessage = time + "秒再发送";
                        time--;
                    } else {
                        $interval.cancel($scope.timer);
                        $scope.tipMessage = "获取验证码";
                    }

                }, 1000);

            } else {
                layer.msg(data.err_msg, {icon: 0});
            }

        })
    }

    $scope.agree=function($event){
        $scope.agreeState=$event.target.checked
    }

    $scope.regist=function(){

        if(!$scope.agreeState){
                layer.msg("请阅读并同意《服务条约》", {icon: 0});
                return true;
        }
        if ($scope.registForm.$invalid) {
            layer.msg("请根据要求输入信息", {icon: 0});
            return true;
        }

        var promise = loginService.register($scope.mobile, $scope.code, $scope.password);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.msg('注册成功，请登录', {
                    icon: 1,
                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    $state.go("index.login")
                });
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

Ctrl.controller("completeMessageCtrl", ["$scope", "$http", "$sce", "$state", "loginService", "$cookieStore", function ($scope, $http, $sce, $state, loginService, $cookieStore) {


}]);
