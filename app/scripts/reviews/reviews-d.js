'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:reviews
* @description
* # reviews
*/
angular.module('scannabis')
.directive('reviews', function ()
{
    return {
        templateUrl: 'scripts/reviews/reviews-d.html',
        restrict: 'EA'
    };
});