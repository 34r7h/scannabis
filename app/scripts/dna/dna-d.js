'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:dna
* @description
* # dna
*/
angular.module('scannabis')
.directive('dna', function ()
{
    return {
        templateUrl: 'scripts/dna/dna-d.html',
        restrict: 'EA'
    };
});