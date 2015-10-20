'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:auth
* @description
* # auth
*/
angular.module('scannabis')
.directive('auth', function ()
{
    return {
        templateUrl: 'scripts/auth/auth-d.html',
        restrict: 'EA'

    };
});