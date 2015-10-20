'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:products
* @description
* # products
*/
angular.module('scannabis')
.directive('products', function ()
{
    return {
        templateUrl: 'scripts/products/products-d.html',
        restrict: 'EA'
    };
});