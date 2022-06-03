(function (app) {
    'use strict';

    app.controller('applicationGroupEditController', applicationGroupEditController);

    applicationGroupEditController.$inject = ['apiService', '$scope', 'notificationService', '$location', 'commonService', '$stateParams'];

    function applicationGroupEditController(apiService, $scope, notificationService, $location, commonService, $stateParams) {
        $scope.group = {}

        $scope.updateApplicationGroup = updateApplicationGroup;

        function updateApplicationGroup() {
            apiService.put('/api/applicationGroup/update', $scope.group, updSuccessed, updFailed);
        }

        function updSuccessed() {
            notificationService.displaySuccess($scope.group.Name + ' đã được chỉnh sửa.');
            $location.url('application_groups');
        }

        function updFailed(response) {
            notificationService.displayError(response.data.Message);
        }

        function loadDetail() {
            apiService.get('/api/applicationGroup/detail/' + $stateParams.id, null,
                function (result) {
                    $scope.group = result.data;
                },
                function (result) {
                    notificationService.displayError(result.data);
                });
        }

        function loadRoles() {
            apiService.get('/api/applicationRole/getlistall',
                null,
                function (response) {
                    $scope.roles = response.data;
                }, function (response) {
                    notificationService.displayError('Không tải được danh sách quyền.');
                });

        }

        loadRoles();
        loadDetail();
    }
})(angular.module('tedushop.application_groups'));