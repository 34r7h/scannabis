'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:shop
* @description
* # shop
*/
angular.module('scannabis')
.directive('shop', function ()
{
    return {
        templateUrl: 'scripts/directives/shop/shop-d.html',
        restrict: 'EA'
    };
});