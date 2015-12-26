'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:product
* @description
* # product
*/
angular.module('scannabis')
.directive('product', function ()
{
    return {
        templateUrl: 'scripts/directives/product/product-d.html',
        restrict: 'EA'
    };
});