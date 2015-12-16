'use strict';

describe('Directive: reviews', function ()
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
        element = $compile('<reviews></reviews>');
        expect(true).toBe(true);
    }));
});