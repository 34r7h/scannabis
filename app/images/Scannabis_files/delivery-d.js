'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:delivery
* @description
* # delivery
*/
angular.module('scannabis')
.directive('delivery', function ()
{
    return {
        templateUrl: 'scripts/directives/delivery/delivery-d.html',
        restrict: 'EA'
    };
});