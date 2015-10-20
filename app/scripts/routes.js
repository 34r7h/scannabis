/**
 * @ngdoc overview
 * @name scannabis.routes
 * @description
 * # scannabis.routes
 *
 * Routes module. All app states are defined here.
 */

angular.module('scannabis')
    .config(function ($stateProvider, $urlRouterProvider)
    {
        'use strict';
        $stateProvider.state('scannabis', {
            url: '/',
            template: '<scannabis></scannabis>'
        });
        $urlRouterProvider.otherwise('/');

        $stateProvider
            /* STATES-NEEDLE - DO NOT REMOVE THIS */;

    });