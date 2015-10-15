'use strict';
window.contactManagerApp = angular.module('contactManagerApp', ['ui.router', 'ui.bootstrap']);

window.contactManagerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/contacts');

    $stateProvider
        .state('contacts', {
            url: '/contacts',
            templateUrl: 'views/contacts.html',
            controller: "MainController"
        })
        .state('add', {
          url: '/contacts/new',
          templateUrl: 'views/add_edit_contact.html',
          controller: "ContactController"
        })
        .state('edit', {
          url: '/contacts/edit/:id',
          templateUrl: 'views/add_edit_contact.html',
          controller: "ContactController"
        });
});

/* Contact Service */
contactManagerApp.factory('ContactService', [function(){
  var contactList = [
    {
      id: 1,
      name : 'Terrence S. Hatfield',
      tel: '651-603-1723',
      email: 'TerrenceSHatfield@rhyta.com'
    },
    {
      id: 2,
      name : 'Chris M. Manning',
      tel: '513-307-5859',
      email: 'ChrisMManning@dayrep.com'
    },
    {
      id: 3,
      name : 'Ricky M. Digiacomo',
      tel: '918-774-0199',
      email: 'RickyMDigiacomo@teleworm.us'
    },
    {
      id: 4,
      name : 'Michael K. Bayne',
      tel: '702-989-5145',
      email: 'MichaelKBayne@rhyta.com'
    },
    {
      id: 5,
      name : 'John I. Wilson',
      tel: '318-292-6700',
      email: 'JohnIWilson@dayrep.com'
    },
    {
      id: 6,
      name : 'Rodolfo P. Robinett',
      tel: '803-557-9815',
      email: 'RodolfoPRobinett@jourrapide.com'
    }
  ];
  function indexOfElement(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr].toString() === value.toString()) {
            return i;
        }
    }
  }
  return {
    getContactList : function () {
      return contactList;
    },
    getContactById : function (val) {
      var index = indexOfElement(contactList, 'id', val);
      return contactList[index];
    },
    addContact : function (contact) {
      contactList.push(contact);
    },
    editContact : function (contact) {
      var index = indexOfElement(contactList, 'id', contact.id);
      contactList[index] = contact;
    },
    deleteContact : function (val) {
      var index = indexOfElement(contactList, 'id', val);
      contactList.splice(index, 1);
    }
  }
}]);
/* End */

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
