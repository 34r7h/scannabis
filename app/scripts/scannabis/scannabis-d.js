'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:scannabis
* @description
* # scannabis
*/
angular.module('scannabis')
.directive('scannabis', function (Data)
{
    return {
        templateUrl: 'scripts/scannabis/scannabis-d.html',
        
        restrict: 'EA',
        scope: {

        },
        link: function (scope, el, attrs)
        {

        },
        controller: function ($scope)
        {
            $scope.data = Data;
            // love :)
        }
    };
});