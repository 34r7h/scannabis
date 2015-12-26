/**
 * @ngdoc service
 * @name scannabis.Data
 * @description
 * # Data
 * Factory in the scannabis.
 */
var online = navigator.onLine;
var fb = Firebase;
var fbRef = 'https://scannabis.firebaseio.com/';
var localForage = localforage;
var products = {};
var fbDb = new fb(fbRef);
var db = {
	users: fbDb.child('users'),
	products: fbDb.child('products'),
	images: fbDb.child('images')
};

angular.module('scannabis')
	.factory('Data', function ($firebaseObject, $firebaseArray, $firebaseAuth, $sce, $window, $state) {
		'use strict';
		var service = {methods: {}, data: {}, auth: {}, test: {}, local: {}};
		// INITIALIZATION
		localForage.getItem('products', function (err, value) {
			service.test.products = value;
		});
		localForage.getItem('images', function (err, value) {
			service.test.images = value;
		});
		localForage.getItem('users', function (err, value) {
			service.test.users = value;
		});
		localForage.getItem('auth', function (err, value) {
			service.auth = value;
			service.auth = $firebaseAuth(fbDb).$getAuth();
		});
		// ACTUAL DEFINITION
		service.methods = {
			getImage: function (ref) {
				var image = service.test.images[ref] || $firebaseObject(db.images.child(ref));
				return image;
			},
			getEntry: function (type, ref) {
				var entry = service.test[type][ref] || $firebaseObject(db[type].child(ref)) ;
				return entry;
			},
			sanitize: function (data) {
				return $sce.trustAsResourceUrl(data);
			},
			getData: function () {
				/*service.test.users = $firebaseObject(db.users).$loaded().then(function (data) {
					localForage.setItem('users', data);
				});*/
				var dbImages = $firebaseObject(db.images);
				dbImages.$loaded().then(function (images) {
					service.test.images = images;
					var localImages = {};
					angular.forEach(images, function (image, imageKey) {
						localImages[imageKey] = image;
					});
					localForage.setItem('images', localImages);
				});
				var dbProducts = $firebaseObject(db.products);
				dbProducts.$loaded().then(function (products) {
					service.test.products = products;
					var localProducts = {};
					angular.forEach(products, function (product, productKey) {
						localProducts[productKey]=product;
					});
					localForage.setItem('products', localProducts);
				});
				var dbUsers = $firebaseObject(db.users);
				dbUsers.$loaded().then(function (users) {
					service.test.users = users;
					var localUsers = {};
					angular.forEach(users, function (user, userKey) {
						localUsers[userKey] = user;
					});
					localForage.setItem('users', localUsers);
				});
			},
			login: function (obj) {
				// var authRef = new fb(fbRef);
				var authObj = $firebaseAuth(fbDb);
				authObj.$authWithPassword({
					email: obj.email,
					password: obj.pass
				}).then(function (auth) {
					service.auth = auth;
					localForage.setItem('auth', auth);
					service.methods.getData();
					$state.go('scannabis.market');
				}).catch(function (error) {
					console.error("Authentication failed:", error);
				});
			},
			register: function (obj) {
				var authRef = new fb(fbRef);
				var authObj = $firebaseAuth(authRef);
				authObj.$createUser({
					email: obj.email,
					password: obj.pass
				}).then(function (userData) {
					console.log("User " + userData.uid + " created successfully!");
					return authObj.$authWithPassword({
						email: obj.email,
						password: obj.pass
					});
				}).then(function (authData) {
					var fbObjRef = authRef.child('users');
					var fbObj = $firebaseObject(fbObjRef).$loaded().then(function (data) {
						obj.pass = null;
						data[authData.uid] = obj;
						data.$save();
					});
					service.methods.getData();
				}).catch(function (error) {
					console.error("Error: ", error);
				});
			},
			logout: function () {
				var authRef = new fb(fbRef);
				var authObj = $firebaseAuth(authRef);
				authObj.$unauth();
				service.data.users = {};
				service.auth = {};
				localForage.clear();

			},
			save: function (type, key, data) {
				console.log('saving data');
				var saveRef = fbRef + type;
				console.log(saveRef);
				var newFb = new fb(saveRef);
				var obj = $firebaseObject(newFb).$loaded().then(function (oldData) {
					// console.log(oldData);
					oldData[key] = data;
					// console.log(oldData);
					// oldData.$value = angular.copy(data);
					oldData.$save();
				});
			},
			add: function (ref, data, social) {
				service.methods.getData();
				var addRef = !social ? fbRef + 'users/' + service.auth.uid + '/public/' + ref :
				fbRef + social + '/' + ref;
				var addFb = new fb(addRef);
				var arr = $firebaseArray(addFb);
				arr.$add(data).then(function () {
					service.methods.getData();
				});
			},
			addNew: function (ref, data, social) {
				service.methods.getData();
				var addRef = !social ? fbRef + 'users/' + service.auth.uid + '/public/' + ref :
				fbRef + social + '/' + ref;
				var addEntryRef = fbRef + ref;
				var addEntryFb = new fb(addEntryRef);
				var addFb = new fb(addRef);
				var arrEntry = $firebaseArray(addEntryFb);
				arrEntry.$add(data).then(function (ref) {
					var entryKey = ref.key();
					var entryObject = $firebaseObject(addFb).$loaded().then(function (data) {
						data[entryKey] = true;
						data.$save();
					});
					service.methods.getData();
				});
			},
			remove: function (type, ref) {
				var removeRef = fbRef + 'users/' + service.auth.uid + '/public/' + type + '/' + ref;
				console.log('removeRef', removeRef);
				var removeFb = new fb(removeRef);
				var obj = $firebaseObject(removeFb);
				obj.$remove();
				$state.reload();
			}


		};
		service.methods.getData();

		return service;
	});