/**
 * This service creates a modal ,
 * properties Of this modal can be set from the controller by injecting this service
 *
 */
contactManagerApp.service('ModalService', ['$modal',
    function ($modal) {
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'views/modal.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            buttons: [{label:'OK'}],
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
      };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults)
            	customModalDefaults = {};
              customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {

            var tempModalDefaults = {};
            var tempModalOptions = {};

            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $modalInstance.close(result);
                        if($scope.modalOptions.buttons[0].callBack)
                          $scope.modalOptions.buttons[0].callBack();
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                        if($scope.modalOptions.buttons[1].callBack)
                          $scope.modalOptions.buttons[1].callBack();
                    };
                }
            }
            return $modal.open(tempModalDefaults).result;
        };
    }]);
