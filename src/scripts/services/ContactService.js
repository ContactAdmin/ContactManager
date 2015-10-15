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
