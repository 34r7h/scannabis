'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:scannabis
* @description
* # scannabis
*/
angular.module('scannabis')
.directive('scannabis', function ()
{
    return {
        templateUrl: 'scripts/directives/scannabis/scannabis-d.html',
        restrict: 'EA'
    };
});