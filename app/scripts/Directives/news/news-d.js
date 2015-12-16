'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:news
* @description
* # news
*/
angular.module('scannabis')
.directive('news', function ()
{
    return {
        templateUrl: 'scripts/directives/news/news-d.html',
        
        restrict: 'EA',
        scope: {

        },
        link: function (scope, el, attrs)
        {

        },
        controller: function ($scope)
        {

        }
    };
});