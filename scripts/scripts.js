/**
 * @ngdoc overview
 * @name scannabis
 * @description
 * # scannabis
 *
 * Main module of the application.
 */
'use strict';

angular.module('scannabis', [
	'ngAnimate',
	'ngAria',
	'ngResource',
	'ngTouch',
	'ui.router',
	'ngSanitize',
	'firebase'/*,
	'uploader'*/
]);

'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:auth
* @description
* # auth
*/
angular.module('scannabis')
.directive('auth', function ()
{
    return {
        templateUrl: 'scripts/directives/auth/auth-d.html',
        restrict: 'EA'

    };
});
'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:coin
* @description
* # coin
*/
angular.module('scannabis')
.directive('coin', function ()
{
    return {
        templateUrl: 'scripts/directives/coin/coin-d.html',
        
        restrict: 'EA',
        scope: {

        },
        link: function (scope, el, attrs)
        {

        },
        controller: ["$scope", function ($scope)
        {

        }]
    };
});
'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:delivery
* @description
* # delivery
*/
angular.module('scannabis')
.directive('delivery', function ()
{
    return {
        templateUrl: 'scripts/directives/delivery/delivery-d.html',
        restrict: 'EA'
    };
});
'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:dna
* @description
* # dna
*/
angular.module('scannabis')
.directive('dna', function ()
{
    return {
        templateUrl: 'scripts/directives/dna/dna-d.html',
        restrict: 'EA'
    };
});
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
        controller: ["$scope", function ($scope)
        {

        }]
    };
});
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
        controller: ["$scope", function ($scope)
        {

        }]
    };
});
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
        controller: ["$scope", function ($scope)
        {

        }]
    };
});
'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:product
* @description
* # product
*/
angular.module('scannabis')
.directive('product', function ()
{
    return {
        templateUrl: 'scripts/directives/product/product-d.html',
        restrict: 'EA'
    };
});
'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:products
* @description
* # products
*/
angular.module('scannabis')
.directive('products', function ()
{
    return {
        templateUrl: 'scripts/directives/products/products-d.html',
        restrict: 'EA'
    };
});
'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:reviews
* @description
* # reviews
*/
angular.module('scannabis')
.directive('reviews', function ()
{
    return {
        templateUrl: 'scripts/directives/reviews/reviews-d.html',
        restrict: 'EA'
    };
});
'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:scannabis
* @description
* # scannabis
*/
angular.module('scannabis')
.directive('scannabis', function ()
{
    return {
        templateUrl: 'scripts/directives/scannabis/scannabis-d.html',
        restrict: 'EA'
    };
});
'use strict';

/**
* @ngdoc directive
* @name scannabis.directive:shop
* @description
* # shop
*/
angular.module('scannabis')
.directive('shop', function ()
{
    return {
        templateUrl: 'scripts/directives/shop/shop-d.html',
        restrict: 'EA'
    };
});
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
    images: fbDb.child('images')
};

angular.module('scannabis')
    .factory('Data', ["$firebaseObject", "$firebaseArray", "$firebaseAuth", "$sce", "$window", "$state", function ($firebaseObject, $firebaseArray, $firebaseAuth, $sce, $window, $state)
    {
        'use strict';
        var service = {methods:{}, data:{}, auth:{}, test:{}, local:{}};
        // INITIALIZATION
        localForage.getItem('products', function (err, value){ service.data.products = value; $state.reload();
        });
        /*localForage.getItem('images', function (err, value){ service.data.images = value; $state.reload();
        });*/
        localForage.getItem('my-products', function (err, value){
            service.data.myProducts = value;
            $state.reload();
        });
        localForage.getItem('auth', function (err, value){
            service.auth = value;
            service.auth = $firebaseAuth(fbDb).$getAuth();
            $state.reload();

        });
        // ACTUAL DEFINITION
        // ACTUAL DEFINITION
        service.methods = {
            getImage: function(ref){
                console.log('getting image', ref);
                var image = $firebaseObject(db.images.child(ref));
                return image;
            },
            sanitize: function (data) {
                return $sce.trustAsResourceUrl(data);
            },
            getData: function(){
                service.test.users = $firebaseObject(db.users);
                service.test.images = $firebaseObject(db.images);
                service.test.users.$loaded().then(function (users) {
                    service.test.products = [];
                    service.test.myProducts = [];
                    angular.forEach(users, function (user, userKey) {

                        angular.forEach(user.public.products, function (product, productKey) {
                            product.user = userKey;
                            product.id = productKey;
                            service.test.products.push(product);
                            // console.log(service.auth);
                            service.auth.uid === userKey  ? service.test.myProducts.push(product) : null;

                        });
                    });
                    service.data = service.test;
                    localForage.setItem('products', service.test.products);
                    /*service.test.images ? localForage.setItem('images', service.test.images) : null;*/
                    localForage.setItem('my-products', service.test.myProducts);
                });
            },
            login: function(obj){
                // var authRef = new fb(fbRef);
                var authObj = $firebaseAuth(fbDb);
                authObj.$authWithPassword({
                    email: obj.email,
                    password: obj.pass
                }).then(function(auth) {
                    service.auth = auth;
                    localForage.setItem('auth', auth);
                    service.methods.getData();
                    $state.go('scannabis.market');
                }).catch(function(error) {
                    console.error("Authentication failed:", error);
                });
            },
            register: function(obj){
                var authRef = new fb(fbRef);
                var authObj = $firebaseAuth(authRef);
                authObj.$createUser({
                    email: obj.email,
                    password: obj.pass
                }).then(function(userData) {
                    console.log("User " + userData.uid + " created successfully!");
                    return authObj.$authWithPassword({
                        email: obj.email,
                        password: obj.pass
                    });
                }).then(function(authData) {
                    var fbObjRef = authRef.child('users');
                    var fbObj = $firebaseObject(fbObjRef).$loaded().then(function(data){
                        obj.pass = null;
                        data[authData.uid] = obj;
                        data.$save();
                    });
                    service.methods.getData();
                }).catch(function(error) {
                    console.error("Error: ", error);
                });
            },
            logout: function(){
                var authRef = new fb(fbRef);
                var authObj = $firebaseAuth(authRef);
                authObj.$unauth();
                service.data.users = {};
                service.auth = {};
                localForage.clear();

            },
            save:function(type, key, data){
                console.log('saving data');
                var saveRef = fbRef + type + '/' + key;
                var newFb = new fb(saveRef);
                var obj = $firebaseObject(newFb);
                obj.$value = angular.copy(data);
                obj.$save();
            },
            add:function(ref, data, social){
                 service.methods.getData();
                var addRef = !social ? fbRef + 'users/'+ service.auth.uid +'/public/' +ref :
                fbRef + social +'/' +ref;
                /*if (social !== null) {
                    var addRef = fbRef + 'users/'+ service.auth.uid +'/public/' +ref;
                } else {
                    var addRef = fbRef + 'users/'+ social +'/public/' +ref;
                }*/
                 /*var addRef = fbRef + 'users/'+ service.auth.uid +'/public/' + ref;*/
                 var addFb = new fb(addRef);
                 var arr = $firebaseArray(addFb);
                 arr.$add(data).then(function(){
                     service.methods.getData();
                 });
            },
            remove: function(type, ref){
                var removeRef = fbRef + 'users/'+ service.auth.uid +'/public/' + type + '/' + ref;
                console.log('removeRef',removeRef);
                var removeFb = new fb(removeRef);
                var obj = $firebaseObject(removeFb);
                obj.$remove();
                $state.reload();
            }


        };
        service.methods.getData();

        return service;
    }]);
'use strict';

/**
 * @ngdoc directive
 * @name scannabis.directive:upload
 * @description
 * # upload
 */
angular.module('scannabis')
	.directive('uploader', ["$rootScope", "$sce", "$firebaseArray", "$firebaseObject", "Data", function ($rootScope, $sce, $firebaseArray, $firebaseObject, Data) {

		return {
			replace: true,
			scope: {
				name: '@name',
				pass: '=pass'
			},
			template: '<form id="{{name}}-form" novalidate><input class="well" type="file" id="{{name}}"/><button type="button" class="btn btn-behance" id="upIt" data-ng-click="upload()">Upload</button></form>',
			restrict: 'E',
			link: function (scope, elem) {
				scope.upload = function () {
					console.log(scope, Data);
					scope.pass ? scope.pass.media = null : $rootScope.media = null;
					var fbImagesRef = 'https://scannabis.firebaseio.com/images';
					var fbUsersImagesRef = 'https://scannabis.firebaseio.com/users/'+Data.auth.uid+'/public/images';
					var fbImages = new Firebase(fbImagesRef);
					var fbUserImages = new Firebase(fbUsersImagesRef);
					var fbImagesArray = $firebaseArray(fbImages);
					var fbUserImagesObject = $firebaseObject(fbUserImages);
					var fileList = document.getElementById(scope.name).files;
					console.log('files', fileList);
					angular.forEach(fileList,
						function (file) {
							scope.reader = new FileReader(file);
							scope.reader.onload = (function (file) {
								scope.reader.readAsDataURL(file);
								return function (e) {
									console.log('-- RESULT', e.target.result, '-- NAME:', file.name);
									var img = new Image();
									img.src = e.target.result;
									fbImagesArray.$add(img.src).then(function (ref) {
										fbUserImagesObject[file.name.replace('.', '``')] = ref.key();
										fbUserImagesObject.$save();
										console.log(ref.key());
										!scope.pass ? $rootScope.media = ref.key() : scope.pass.media = ref.key();
										document.getElementById(scope.name).value = null;
									});
								}
							})(file);
						})
				}
			}
		}
	}]);
/*
 .directive('upload', function ()
 {
 return {
 templateUrl: 'scripts/main/upload/upload-d.html',
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
 });*/
var uploader = angular.module('uploader', ['ngSanitize'])
	.config(["$compileProvider", function ($compileProvider) {
		// sanitizer for canvas image manipulations
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
	}]);

uploader.provider('AWSControl', function () {

	var mimes = [];

	this.yeah = 'Hi';
	this.dataImg = '';


	this.$get = ["$q", "$rootScope", "$firebaseArray", "$sce", function ($q, $rootScope, $firebaseArray, $sce) {

		return {
			dataImg: this.dataImg,
			mimes: mimes,
			upload: function (file, key) {

				console.log('file: ', file);
				console.log('key: ', key);
				var originalKey = key;
				$rootScope.dataImg = file;
				var cDate = Date.now();
				key = key.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
				key = key + '-' + cDate + '.png';

				var handlerIndex = -1;

				angular.forEach(this.mimes, function (mime, index) {
					if (handlerIndex === -1) {

						handlerIndex = index;

					}
				});

				if (handlerIndex === -1) {
					return false; //this should almost never happen considering canHandle is called prior
				}

				//now for handlers

				var deferred = $q.defer();

				var handler = this.mimes[handlerIndex];

				//TODO switch for different host handlers. Must retun a promise and use $timeout to reject quickly

				if (handler.host === 's3') {//begin S3 handler

					var params = {Key: key, ContentType: file.type, Body: file};

					AWS.config.update({accessKeyId: handler.accessKeyId, secretAccessKey: handler.secretAccessKey});
					AWS.config.region = handler.region;
					AWS.config.host = handler.host;

					var bucket = new AWS.S3({params: {Bucket: handler.Bucket}});

					bucket.putObject(params, function (err, data) {

						if (err) {
							$rootScope.$broadcast('AWSUploadError');
							deferred.reject(err);
						}
						else {
							$rootScope.$broadcast('AWSUploadSuccess');
							deferred.resolve(data);
							$rootScope.newImage = 'https://' + AWS.config.host + '-' + AWS.config.region + '.amazonaws.com/' + handler.Bucket + '/' + encodeURIComponent(key);
							$rootScope.mediaTitle = originalKey;
							$rootScope.mediaThumbs = {};
							$rootScope.mediaDescription = 'Vancouver Metalwork';
							$rootScope.mediaTitle = $rootScope.mediaTitle.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
							$rootScope.mediaTags = [originalKey];
							var media = new Firebase("https://metal.firebaseio.com/media");
							var sync = $firebase(media);
							sync.$push({
								mediaThumbs: $rootScope.smallMedia,
								mediaURL: $rootScope.newImage,
								mediaTitle: $rootScope.mediaTitle,
								mediaLink: $rootScope.mediaTitle.toLowerCase().replace(/'+/g, '').replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, ''),
								mediaDescription: $rootScope.mediaDescription,
								mediaTags: $rootScope.mediaTags
							}).then(function (media) {
								var newID = media.name();
								var index = new Firebase("https://metal.firebaseio.com/index/media");
								var sync = $firebase(index);
								sync.$set($rootScope.mediaTitle, newID);
							});

						}


					});

					return deferred.promise;


				}// end S3 handler
				else {

					alert('No handler');

				}


			}

		};// return brace

	}]; //end .$get

});

uploader.directive('uploader', ["AWSControl", "$rootScope", "$sce", "$firebaseArray", function (AWSControl, $rootScope, $sce, $firebaseArray) {

	return {
		replace: true,
		scope: {},
		template: '<form name="uploading" novalidate><input class="well" type="file" id="yourInput"/><button type="button" class="btn btn-behance" id="upIt" data-ng-click="upload()">Upload</button></form>',
		restrict: 'E',
		link: function (scope, elem) {
			scope.upload = function () {
				var fbImagesRef = 'https://scannabis.firebaseio.com/images';
				var localForage = localforage;
				var fbImages = new Firebase(fbImagesRef);
				var fbImagesArray = $firebaseArray(fbImages);
				var fileList = document.getElementById("yourInput").files;
				console.log('files', fileList);
				angular.forEach(fileList,
					function (file) {
						// var fileName=fileKey;
						// $rootScope.media[fileName] = {};
						console.log('for each file', file);
						scope.reader = new FileReader(file);
						scope.reader.onload = (function (file) {
							scope.reader.readAsDataURL(file);
							return function (e) {
								console.log('-- RESULT', e.target.result, '-- NAME:', file.name);
								var img = new Image();
								img.src = e.target.result;
								/*console.log('img.src', img.src);
								var canvas = document.createElement('canvas'),
									ctx = canvas.getContext('2d'),
									sizes = [100, 600, 1000];
								angular.forEach(sizes, function (size) {
									$rootScope.media[fileName][size] = {};
									x = img.width / size;
									canvas.width = size;
									canvas.height = img.height / x;
									ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
									$rootScope.media[fileName][size] = canvas.toDataURL();
								});*/
								fbImagesArray.$add(img.src).then(function (ref) {
									console.log(ref.key());
									$rootScope.media = ref.key();
									document.getElementById("yourInput").value = null;
								});
							}
						})(file);
					})
			}
		}
	}
}]);



					/*			/!*
								var img = new Image();
								img.src = encodedImg;
								// set its dimension to target size
								angular.forEach(sizes, function (size) {
									x = img.width / size;
									canvas.width = size;
									canvas.height = img.height / x;
									ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
									$rootScope.smallMedia[lefile.name][size] = canvas.toDataURL();
								}
							}
							)(file);

					}
				);

				/!*for (var x = 0; x < fileList; x++) {
				 var fileInput = elem[0].children[0];
				 var file = fileInput.files[x];
				 console.log('file',file);
				 elem[0].children[1].disabled = true;
				 elem[0].children[1].innerHTML = 'Uploading...';


				 scope.reader = new FileReader();
				 scope.reader.onload = (function (lefile) {
				 scope.reader.readAsDataURL(file);
				 return function (e) {


				 console.log('-- RESULT', e.target.result, '-- NAME:', lefile.name);

				 (function imageToDataUri(imgs) {
				 console.log('img resize', arguments);
				 var canvas = document.createElement('canvas'),
				 ctx = canvas.getContext('2d'),
				 sizes = [60, 100, 160];
				 $rootScope.smallMedia = {};
				 angular.forEach(imgs, function (encodedImg) {
				 $rootScope.smallMedia[lefile.name] = {};
				 var img = new Image();
				 img.src = encodedImg;
				 // set its dimension to target size
				 angular.forEach(sizes, function (size) {
				 x = img.width / size;
				 canvas.width = size;
				 canvas.height = img.height / x;
				 ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				 $rootScope.smallMedia[lefile.name][size] = canvas.toDataURL();
				 });
				 // draw source image into the off-screen canvas:

				 // encode image to data-uri with base64 version of compressed image
				 return e.target.result;
				 });


				 })(e.target.result);
				 };
				 })(file);
				 }*!/
			};// end scope.upload
		}// end link
	};
});*/

/**
 * @ngdoc overview
 * @name scannabis.routes
 * @description
 * # scannabis.routes
 *
 * Routes module. All app states are defined here.
 */

angular.module('scannabis')
	.config(["$stateProvider", "$urlRouterProvider", "$compileProvider", function ($stateProvider, $urlRouterProvider, $compileProvider) {
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
				controller: ["$scope", "Data", "$state", function ($scope, Data, $state) {
					$scope.data = Data;
					$scope.state = $state;
					$scope.local = Data.local;
				}]
			})
			.state('scannabis.market', {
				url: 'market',
				template: '<ui-view></ui-view><shop></shop><reviews></reviews>'
			})
			.state('scannabis.market.location', {
				url: '/:location'
			})
			.state('scannabis.market.location.shop', {
				url: '/:shop'
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
			.state('scannabis.coins', {
				url: 'coins',
				template: '<coin></coin>'
			})
			.state('scannabis.jobs', {
				url: 'jobs',
				template: '<jobs></jobs>'
			})
			.state('scannabis.jobs.job', {
				url: '/:job',
				template: '<job></job>'
			})
			.state('scannabis.jobs.hires', {
				url: 'jobs',
				template: '<jobs></jobs>'
			});
		$urlRouterProvider.otherwise('/');
			/* STATES-NEEDLE - DO NOT REMOVE THIS */;

	}]);