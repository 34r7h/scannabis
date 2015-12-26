'use strict';

describe('Directive: upload', function ()
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
        element = $compile('<upload></upload>');
        expect(true).toBe(true);
    }));
});