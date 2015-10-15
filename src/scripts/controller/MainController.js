/* MainController - Shows the list of contacts */
contactManagerApp.controller('MainController', ['$scope', 'ContactService', 'ModalService', function($scope, ContactService, ModalService){
  /* Get the list from service */
  $scope.contactList = ContactService.getContactList();
  /* Delete a contact */
  $scope.id = "";
  $scope.deleteContact = function (id) {
    $scope.id = id;
    var modalOptions = {
	            buttons: [{label:'OK', callBack:$scope.handleSuccess}, {label:'Cancel'}],
	            headerText: 'Delete Contact',
	            bodyText: 'Are you sure you want to delete?'
	  };
		ModalService.showModal({}, modalOptions).then(function (result) {
		});
  };
  $scope.handleSuccess = function () {
    ContactService.deleteContact($scope.id);
  };
}]);
/* End */
