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
        templateUrl: 'scripts/directives/auth/auth-d.html',
        restrict: 'EA'

    };
});