/**
 * @ngdoc overview
 * @name scannabis.routes
 * @description
 * # scannabis.routes
 *
 * Routes module. All app states are defined here.
 */

angular.module('scannabis')
	.config(function ($stateProvider, $urlRouterProvider, $compileProvider) {
		'use strict';
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
		$stateProvider
			.state('scannabis.test', {
				url: 'test',
				template: '<scannabis></scannabis>'
			})
			.state('scannabis', {
				url: '/',
				template: '<scannabis></scannabis>',
				controller: function ($scope, Data, $state) {
					$scope.data = Data;
					$scope.state = $state;
				}
			})
			.state('scannabis.market', {
				url: 'market',
				template: '<ui-view></ui-view><shop></shop><reviews></reviews>'
			})
			.state('scannabis.market.product', {
				url: '/:user/:product',
				template: '<product></product><reviews></reviews>'
			})
			.state('scannabis.auth', {
				url: 'auth',
				template: '<auth></auth>'
			})
			.state('scannabis.pos', {
				url: 'pos',
				template: '<products></products><reviews></reviews>'
			})
			.state('scannabis.strains', {
				url: 'strains',
				template: '<dna></dna>'
			})
			.state('scannabis.delivery', {
				url: 'delivery',
				template: '<delivery></delivery>'
			})
			.state('scannabis.news', {
				url: 'news',
				template: '<news></news>'
			})
			.state('scannabis.users', {
				url: 'users',
				template: '<users></users>'
			})
			.state('scannabis.coin', {
				url: 'coins',
				template: '<coin></coin>'
			});
		$urlRouterProvider.otherwise('/');
			/* STATES-NEEDLE - DO NOT REMOVE THIS */;

	});