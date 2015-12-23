'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:jobs
* @description
* # jobs
*/
angular.module('scannabis')
.directive('jobs', function ()
{
    return {
        templateUrl: 'scripts/directives/jobs/jobs-d.html',
        
        restrict: 'EA',
        link: function (scope, el, attrs)
        {

        },
        controller: function ($scope)
        {

        }
    };
});