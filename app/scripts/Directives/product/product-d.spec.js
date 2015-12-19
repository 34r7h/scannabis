'use strict';

describe('Directive: product', function ()
{

    // load the directive's module
    beforeEach(module('scannabis'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope)
    {
        scope = $rootScope.$new();
    }));

    it('should do something', inject(function ($compile)
    {
        element = $compile('<product></product>');
        expect(true).toBe(true);
    }));
});