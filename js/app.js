//var  Url= 'http://jsjeda.net:20081/Service1.svc';
var Url = 'http://localhost:29851/Service1.svc';
var Key = localStorage.UserKey;

var myApp = angular.module('myApp', ['ui.router', 'ngGrid', 'ngCookies', 'Ctrl', 'ui.bootstrap', 'ngSanitize']);

//myApp.filter('trustHtml', function ($sce) {
//    return function (input) {
//        return $sce.trustAsHtml(input);
//    }
//});
myApp.factory('httpInterceptor', function ($injector, $location) {
    var httpInterceptor = {
        'request': function (config) {
            if (Key != '') {
                config.headers['Key'] = Key;
                //console.log(config.url);
            } else {
                $location.path('/index');
            }
            return config;
        },
        'responseError': function (response) {
            if (response.data.Message == "未授权，非法访问！") {
                $location.path('/index');
            }
        }
    };
    return httpInterceptor;
});

myApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'Views/TourismIndex/TourismIndex.html'
        })
        .state('index.default', {
            url: '/default',
            templateUrl: 'Views/TourismIndex/default.html'
        })
        .state('index.login', {
            url: '/login',
            templateUrl: 'Views/Login/login.html'
        })
        .state('index.regist', {
            url: '/regist',
            templateUrl: 'Views/Regist/regist.html'
        })
        .state('index.reset1', {
            url: '/reset1',
            templateUrl: 'Views/Login/reset1.html'
        })
        .state('index.reset2', {
            url: '/reset2',
            params: {"test": "1"},
            templateUrl: 'Views/Login/reset2.html'
        })
        .state('manager', {
            url: '/manager',
            params: {"test": "1"},
            templateUrl: 'Views/Manager/index.html'
        })
});



