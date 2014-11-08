'use strict';

describe('Service: esFactory', function () {

  // load the service's module
  beforeEach(module('xeElasticsearchApp'));

  // instantiate service
  var esFactory;
  beforeEach(inject(function (_esFactory_) {
    esFactory = _esFactory_;
  }));

  it('should do something', function () {
    expect(!!esFactory).toBe(true);
  });

});
