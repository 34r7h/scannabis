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
    .factory('Data', function ($firebaseObject, $firebaseArray, $firebaseAuth, $sce, $window, $state)
    {
        'use strict';
        var service = {methods:{}, data:{}, auth:{}, test:{}, local:{}};
        // INITIALIZATION
        localForage.getItem('products', function (err, value){ service.data.products = value; $state.reload();
        });
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
                return $firebaseObject(db.images.child(ref));
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
                    localForage.setItem('my-products', service.test.myProducts);
                });
                // service.auth = $firebaseAuth(fbDb).$getAuth();
                // var usersRef = new fb(fbRef);
                // var auth = $firebaseAuth(usersRef);
                /*localForage.getItem('auth', function (err, value) {
                    if (value) {
                        console.log('localForage has auth', performance.now() - perf);
                        service.auth = value;
                        $state.go('scannabis.market');
                    }
                });*/

                /*

                localForage.getItem('data', function (err, value) {
                    if (value) {
                        console.log('localForage has data', performance.now() - perf);
                        service.data = value;
                        if (service.data.auth) {
                            var perfFB = performance.now();
                            console.log(value, perfFB);
                            $firebaseArray(usersRef).$loaded().then(function(data){
                                console.log(data, performance.now());
                                // service.data.users = data.$getRecord('users');
                                service.data.users = db.users;
                                console.log('service.data.users', service.data.users);
                                var authData = auth.$getAuth();
                                service.auth = authData;
                                localForage.setItem('data', service.data);
                                localForage.setItem('auth', service.auth);
                                // TODO Check diff for data sync.
                            });
                        } else {
                            console.log("Logged out");
                        }
                    } else {
                        var authData = auth.$getAuth();
                        if (authData) {
                            $firebaseArray(usersRef).$loaded().then(function(data){
                                service.data.users = data.$getRecord('users');
                                service.auth = authData;
                                localForage.setItem('data', service.data);
                                localForage.setItem('auth', service.auth);
                                // TODO Check diff for data sync.
                            });
                        } else {
                            console.log("Logged out");
                        }
                    }
                });
                */
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
            }


        };
        service.methods.getData();

        return service;
    });