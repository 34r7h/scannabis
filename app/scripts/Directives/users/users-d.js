'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:users
* @description
* # users
*/
angular.module('scannabis')
.directive('users', function ()
{
    return {
        templateUrl: 'scripts/directives/users/users-d.html',
        restrict: 'EA'
    };
});