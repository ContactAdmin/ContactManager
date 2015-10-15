/* Unit test for ContactService */
'use strict';
describe('unit: ContactService', function () {
    var contactService;
    beforeEach(module('contactManagerApp'));

    beforeEach(inject(function ($injector) {
        contactService = $injector.get('ContactService');
    }));

    it('should get the list of contacts', function () {
        var contactList = contactService.getContactList();
        expect(contactList.length).toBeGreaterThan(1);
        console.log("Fetched the contacts list "+contactList.length);
    });

    it('should add a new contact', function () {
        var contactList = contactService.addContact(
          {
            id: 7,
            name : 'Test1',
            tel: '651-603-1723',
            email: 'test1@mail.com'
          }
        );
        console.log("Added a new contact ");
    });

    it('should get a contact by id', function () {
        var contact = contactService.getContactById(1);
        console.log("Fetched the contact data by id "+contact);
    });

    it('should update the existing contact details', function () {
      var contactList = contactService.editContact(
        {
          id: 2,
          name : 'Test2',
          tel: '651-603-1723',
          email: 'test2@mail.com'
        }
      );
      console.log("Updated the contact details");
    });

    it('should delete a contact', function () {
      contactService.deleteContact(3);
      console.log("Deleted the contact");
    });

    it('should get the list of contacts after CRUD operation', function () {
        var contactList = contactService.getContactList();
        expect(contactList.length).toBeGreaterThan(1);
        console.log("Contacts list after CRUD "+contactList.length);
    });
});
