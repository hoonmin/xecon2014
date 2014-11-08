'use strict';

/**
 * @ngdoc Application
 * @name xeElasticsearchApp
 * @description
 * # xeElasticsearchApp
 *
 * Main module of the application.
 */
angular
  .module('xeElasticsearchApp', [
    'ngResource',
    'ngRoute',
    'elasticsearch'
  ])
  .constant('CONFIG', {
    elasticsearch: 'http://125.209.193.50:49200',
    index: 'xe_index',
    type: 'document',
    xe: 'http://125.209.193.50:49080'
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .otherwise({
        redirectTo: '/search'
      });
  });
