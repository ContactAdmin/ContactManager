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
