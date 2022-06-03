(function (app) {
    'use strict';

    app.controller('applicationRoleAddController', applicationRoleAddController);

    applicationRoleAddController.$inject = ['apiService', '$scope', 'notificationService', '$location', 'commonService'];

    function applicationRoleAddController(apiService, $scope, notificationService, $location, commonService) {
        $scope.role = {
            Id: 0
        }

        $scope.addAppRole = addAppRole;

        function addAppRole() {
            apiService.post('/api/applicationRole/add', $scope.role, addSuccessed, addFailed);
        }

        function addSuccessed() {
            notificationService.displaySuccess($scope.role.Name + ' đã được thêm mới.');
            $location.url('application_roles');
        }

        function addFailed(response) {
            notificationService.displayError(response.data.Message);
        }
    }
})(angular.module('tedushop.application_roles'));