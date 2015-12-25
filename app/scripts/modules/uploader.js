var uploader = angular.module('uploader', ['ngSanitize'])
	.config(function ($compileProvider) {
		// sanitizer for canvas image manipulations
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
	});

uploader.provider('AWSControl', function () {

	var mimes = [];

	this.yeah = 'Hi';
	this.dataImg = '';


	this.$get = function ($q, $rootScope, $firebase, $sce) {

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

	}; //end .$get

});

uploader.directive('uploader', function (AWSControl, $rootScope, $sce) {

	return {
		replace: true,
		scope: {},
		template: '<form name="uploading" novalidate><input class="well" type="file" multiple="multiple" id="yourInput" ng-blur="upload()"/><!--<button class="btn btn-behance" id="upIt" data-ng-click="upload()">Upload</button>--></form>',
		restrict: 'E',
		link: function (scope, elem) {
			scope.upload = function () {
				var fileList = document.getElementById("yourInput").files;
				console.log('files', fileList);
				$rootScope.media = [];
				angular.forEach(fileList,
					function (file, fileKey) {
						var fileName=fileKey;
						$rootScope.media[fileName] = {};
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
								$rootScope.media[fileName].full = img.src;
							}
						})(file);
					})
			}
		}
	}
});



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
