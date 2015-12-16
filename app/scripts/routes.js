/**
 * @ngdoc overview
 * @name scannabis.routes
 * @description
 * # scannabis.routes
 *
 * Routes module. All app states are defined here.
 */

angular.module('scannabis')
	.config(function ($stateProvider, $urlRouterProvider) {
		'use strict';
		$stateProvider
			.state('scannabis.test', {
				url: 'test',
				template: '<scannabis></scannabis>'
			})
			.state('scannabis', {
				url: '/',
				template: '<ul style="display: flex; width:100%"><li style="flex: 1 1 100px"><a ui-sref="scannabis.delivery">Delivery</a></li><li style="flex: 1 1 100px"><a ui-sref="scannabis.market">Market</a></li><li style="flex: 1 1 100px"><a ui-sref="scannabis.pos">POS</a></li><li style="flex: 1 1 100px"><a ui-sref="scannabis.strains">Strains</a></li></ul><ui-view></ui-view><ul style="display: flex; width:100%"><li style="flex: 1 1 100px"><a ui-sref="scannabis.news">News</a></li><li style="flex: 1 1 100px"><a ui-sref="scannabis.auth">auth</a></li><li style="flex: 1 1 100px"><a ui-sref="scannabis.coin">coin</a></li><li style="flex: 1 1 100px"><a ui-sref="scannabis.users">Users</a></li></ul>',
				controller: function ($scope, Data) {
					$scope.data = Data;
				}
			})
			.state('scannabis.market', {
				url: 'market',
				template: '<shop></shop><reviews></reviews>'
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