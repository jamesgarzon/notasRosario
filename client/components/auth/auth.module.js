'use strict';

angular.module('notasRosarioApp.auth', ['notasRosarioApp.constants', 'notasRosarioApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
