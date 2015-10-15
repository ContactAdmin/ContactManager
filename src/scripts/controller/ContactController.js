/* Add contact or update contact details */
contactManagerApp.controller('ContactController', ['$scope', 'ContactService', '$stateParams', '$state', function($scope, ContactService, $stateParams, $state){
  $scope.id = $stateParams.id;
  $scope.mode = $scope.id ? "edit" : "add";
  $scope.contactForm = $scope.id ? ContactService.getContactById($scope.id) : {};

  /* Invoke newContact or editContact */
  $scope.submitContact = function () {
    $scope.mode == "add" ? $scope.addNewContact() : $scope.editContact();
  };

  /* Add a new contact */
  $scope.addNewContact = function () {
    var listLen =  ContactService.getContactList().length;
    var newContact = {
                    id: listLen+1,
                    name: $scope.contactForm.name,
                    tel: $scope.contactForm.tel,
                    email: $scope.contactForm.email
                 }
    ContactService.addContact(newContact);
    $state.go('contacts');
  };
  /* Update contact details */
  $scope.editContact = function () {
    var newContact = {
                    id: $scope.id,
                    name: $scope.contactForm.name,
                    tel: $scope.contactForm.tel,
                    email: $scope.contactForm.email
                 }
    ContactService.editContact(newContact);
    $state.go('contacts');
  };
}]);
/* End */
