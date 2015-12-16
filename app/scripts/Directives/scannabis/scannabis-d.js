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
        templateUrl: 'scripts/directives/scannabis/scannabis-d.html',
        
        restrict: 'EA',
        scope: {

        },
        controller: function ($scope)
        {
            $scope.data = Data;
            // love :)
        }
    };
});