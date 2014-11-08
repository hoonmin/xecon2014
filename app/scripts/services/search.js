'use strict';

/**
 * @ngdoc Search service
 * @name xeElasticsearchApp.search
 * @description
 * # search
 * Service in the xeElasticsearchApp.
 */
angular.module('xeElasticsearchApp')
  .service('esService', ['CONFIG', '$q', 'esFactory', function search(CONFIG, $q, elasticsearch) {
    var client = elasticsearch({
      host: CONFIG.elasticsearch
    });

    var searcher = function (term, offset, size) {
      var deferred = $q.defer();
      var query = {
        'bool': {
          'must': [
//            { 'match': { 'article.title': term }},
//            { 'match': { 'article.content': term }},
            { 'fuzzy_like_this': {
              'fields': ['article.title', 'article.content'],
              'like_text': term,
              'max_query_terms': 1
            }}
//            { 'fuzzy': {
//              'article.content' : {
//                'boost': 1.0,
//                'fuzziness': 2,
//                'prefix_length': 0,
//                'max_expansions': 100,
//                'value': term
//              }
//            }}
          ]
        }
      };
      var sort = [
        { 'article.regdate' : {'order' : 'desc'}},
        '_score'
      ];
      var highlight = {
        'pre_tags': ['<strong class="highlight">'],
        'post_tags': ['</strong>'],
        'fields': {
          'article.title': {},
          'article.content': {}
        }
      };
      client.search({
        'index': 'xe_index',
        'type': 'document',
        'body': {
          'size': size,
          'from': (offset || 0) * size,
          'query': query,
          'sort': sort,
          'highlight': highlight
        }
      }).then(function (result) {
        var searchResult = {
          took: result.took,
          total: result.hits.total,
          size: size,
          pages: Math.floor(result.hits.total / size) + 1,
          hits: result.hits.hits
        };
        deferred.resolve(searchResult);
      }, deferred.reject);

      return deferred.promise;
    };
    
    return {
      search: searcher
    };
  }]);
