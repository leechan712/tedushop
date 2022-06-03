(function (app) {
    'use strict';

    app.controller('applicationRoleEditController', applicationRoleEditController);

    applicationRoleEditController.$inject = ['apiService', '$scope', 'notificationService', '$location', '$stateParams'];

    function applicationRoleEditController(apiService, $scope, notificationService, $location, $stateParams) {
        $scope.role = {}

        $scope.updateApplicationRole = updateApplicationRole;

        function updateApplicationRole() {
            apiService.put('/api/applicationRole/update', $scope.role, updSuccessed, updFailed);
        }

        function updSuccessed() {
            notificationService.displaySuccess($scope.role.Name + ' đã được chỉnh sửa.');
            $location.url('application_groups');
        }

        function updFailed(response) {
            notificationService.displayError(response.data.Message);
        }

        function loadDetail() {
            apiService.get('/api/applicationRole/detail/' + $stateParams.id, null,
                function (result) {
                    $scope.group = result.data;
                },
                function (result) {
                    notificationService.displayError(result.data);
                });
        }

        loadDetail();
    }
})(angular.module('tedushop.application_roles'));