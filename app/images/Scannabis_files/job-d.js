'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:job
* @description
* # job
*/
angular.module('scannabis')
.directive('job', function ()
{
    return {
        templateUrl: 'scripts/directives/job/job-d.html',
        
        restrict: 'EA',
        link: function (scope, el, attrs)
        {

        },
        controller: function ($scope)
        {

        }
    };
});