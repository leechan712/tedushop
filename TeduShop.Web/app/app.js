/// <reference path="../assets/admin/libs/angular.js/angular.js" />
(function () {
    angular.module('tedushop',
        ['tedushop.products',
         'tedushop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/admin',
            templateUrl: '/app/components/home/homeView.html',
            controller: 'homeController'
        });
        $urlRouterProvider.otherwise('/admin');
    };
})();