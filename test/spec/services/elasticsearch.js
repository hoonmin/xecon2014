'use strict';

describe('Service: elasticsearch', function () {

  // load the service's module
  beforeEach(module('xeElasticsearchApp'));

  // instantiate service
  var elasticsearch;
  beforeEach(inject(function (_elasticsearch_) {
    elasticsearch = _elasticsearch_;
  }));

  it('should do something', function () {
    expect(!!elasticsearch).toBe(true);
  });

});
