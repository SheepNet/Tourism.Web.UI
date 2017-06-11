//登录界面控制器
Ctrl.controller("LoginController", ["$scope", "$http", "$sce", "$state", "loginService", "$cookieStore", function ($scope, $http, $sce, $state, loginService, $cookieStore) {

    $scope.user_id = localStorage.getItem("user_id");
    $scope.password = localStorage.getItem("password");

    if ($scope.user_id != null && $scope.password != null) {
        $scope.rememberState = true;
    }


    $scope.RememberPassword = function ($event) {
        if ($event.target.checked) {
            localStorage.setItem("user_id", $scope.user_id);
            localStorage.setItem("password", $scope.password);
        } else {
            $scope.rememberState = false;
            localStorage.removeItem("user_id");
            localStorage.removeItem("password");
        }
    }

    $scope.login = function () {
        if ($scope.loginForm.$invalid) {
            layer.msg("请根据要求输入信息", {icon: 0});
            return true;
        }
        //验证手机号码位数
        loginService.login($scope.user_id, $scope.password).then(function (data) {
            if (data.err_code == 0) {
                $cookieStore.put("session_id", data.msg_body.session_id);
                var userMessage = data.msg_body.user;
                var turnUrl = "";
                if (userMessage.type == 1) {
                    turnUrl = 'guideClient';
                }
                if (userMessage.type == 2) {
                    turnUrl = 'agencyClient';
                }
                if (userMessage.type == 3) {
                    turnUrl = 'manage';
                }
                $cookieStore.put("user", userMessage);
                $state.go(turnUrl);
            } else {
                layer.msg(data.err_msg, {icon: 0});
            }

        }, function (error) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        }).catch(function (data) {
            layer.msg("系统或网络异常,请稍后再尝试!", {icon: 0})
        });
    }
}]);

Ctrl.controller("Reset1Controller", ["$scope", "$http", "$sce", "$state", "$stateParams", "loginService", "$interval", function ($scope, $http, $sce, $state, $stateParams, loginService, $interval) {

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
    $scope.ResetPassword = function () {

        if ($scope.loginForm.$invalid) {
            layer.msg("请根据要求输入信息", {icon: 0});
            return true;
        }

        $interval.cancel($scope.timer);
        $scope.tipMessage = "获取验证码";
        var promise = loginService.setup_password($scope.mobile, $scope.code, $scope.password);
        promise.then(function (data) {
            if (data.err_code == 0) {
                layer.msg('重置成功，请重新登陆', {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
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
