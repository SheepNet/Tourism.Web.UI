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
        .state('manage', {
            url: '/manage',
            params: {"test": "1"},
            templateUrl: 'Views/Manage/index.html'
        })
        .state('manage.infoCenter', {
            url: '/infoCenter',
            templateUrl: 'Views/Manage/infoCenter.html'
        })
        .state('manage.guideMange', {
            url: '/guideMange',
            templateUrl: 'Views/Manage/guideManage.html'
        })
        .state('manage.agencyMange', {
            url: '/agencyMange',
            templateUrl: 'Views/Manage/agencyManage.html'
        })
        .state('manage.verifyCenter', {
            url: '/verifyCenter',
            templateUrl: 'Views/Manage/verifyCenter.html'
        })
        .state('manage.orderManage', {
            url: '/orderManage',
            templateUrl: 'Views/Manage/orderManage.html'
        })
        .state('manage.complaintCenter', {
            url: '/complaintCenter',
            templateUrl: 'Views/Manage/complaintCenter.html'
        })
        .state('manage.messageSetting', {
            url: '/messageSetting',
            templateUrl: 'Views/Manage/messageSetting.html'
        })
        .state('manage.statisticsCenter', {
            url: '/statisticsCenter',
            templateUrl: 'Views/Manage/statisticsCenter.html'
        })
        .state('guideClient', {
            url: '/guideClient',
            templateUrl: 'Views/GuideClient/index.html'
        })
        .state('guideClient.guideInfoCenter', {
            url: '/guideInfoCenter',
            templateUrl: 'Views/GuideClient/guideInfoCenter.html'
        })
        .state('guideClient.guideEdit', {
            url: '/guideEdit',
            templateUrl: 'Views/GuideClient/guideEdit.html'
        })
        .state('guideClient.orderDetail', {
            url: '/orderDetail',
            templateUrl: 'Views/GuideClient/orderDetail.html'
        })
        .state('guideClient.orderReceive', {
            url: '/orderReceive',
            templateUrl: 'Views/GuideClient/orderReceive.html'
        })
        .state('guideClient.orderNow', {
            url: '/orderNow',
            templateUrl: 'Views/GuideClient/orderNow.html'
        })
        .state('guideClient.orderEnd', {
            url: '/orderEnd',
            templateUrl: 'Views/GuideClient/orderEnd.html'
        })
        .state('guideClient.guideComplaint', {
            url: '/guideComplaint',
            templateUrl: 'Views/GuideClient/guideComplaint.html'
        })
        .state('guideClient.joinUs', {
            url: '/joinUs',
            templateUrl: 'Views/GuideClient/joinUs.html'
        })
});



