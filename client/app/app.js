'use strict';

angular.module('notasRosarioApp', ['notasRosarioApp.auth', 'notasRosarioApp.admin',
    'notasRosarioApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router',
    'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
