//登录界面控制器
Ctrl.controller("LoginController", ["$scope","$http","$sce","$state",function ($scope, $http, $sce,$state) {
    $scope.login=function(){
       // $state.go('manage');
        $state.go('guideClient');
    }
}]);

Ctrl.controller("Reset1Controller", ["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    $scope.resetNext=function(){
        $state.go('index.reset2', {test: 233});
    }

}]);

Ctrl.controller("Reset2Controller", ["$scope","$http","$sce","$state","$stateParams",function ($scope, $http, $sce,$state,$stateParams) {
    console.log($stateParams.test);
}]);