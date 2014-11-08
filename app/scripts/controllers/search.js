'use strict';

/**
 * @ngdoc function
 * @name xeElasticsearchApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the xeElasticsearchApp
 */
angular.module('xeElasticsearchApp')
  .controller('SearchCtrl', function (esService, $scope, $sce, CONFIG) {
    $scope.page = 1;
    $scope.size = 10;
    $scope.searchResult = {
      took: 0,
      total: 0,
      hits: {}
    };
    $scope.xe = CONFIG.xe;

    $scope.onQueryChange = function () {
      esService.search($scope.keywords, $scope.page - 1, $scope.size).then(function (result) {
        $scope.searchResult = result;
      });
    };

    $scope.onPageNav = function (mode) {
      if (mode === 'first') {
        $scope.page = 1;
      } else if (mode === 'prev' && $scope.page > 1) {
        $scope.page -= 1;
      } else if (mode === 'next' && $scope.page < $scope.searchResult.pages) {
        $scope.page += 1;
      } else if (mode === 'last') {
        $scope.page = $scope.searchResult.pages;
      } else {
        return;
      }
      $scope.onQueryChange();
    };

    // FIXME check for security issues
    $scope.renderHtml = function (html) {
      return $sce.trustAsHtml(html);
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
