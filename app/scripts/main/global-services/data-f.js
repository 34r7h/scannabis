/**
 * @ngdoc service
 * @name scannabis.Data
 * @description
 * # Data
 * Factory in the scannabis.
 */
var fb = Firebase;
var fbRef = 'https://scannabis.firebaseio.com/';

angular.module('scannabis')
    .factory('Data', function ($firebaseObject, $firebaseArray, $firebaseAuth, $sce)
    {
        'use strict';
        var service = {methods:{}, data:{}, auth:{}};
        // INITIALIZATION

        // ACTUAL DEFINITION
        service.methods = {
            sanitize: function (data) {
                return $sce.trustAsResourceUrl(data);
            },
            getData: function(){
                var usersRef = new fb(fbRef);
                var auth = $firebaseAuth(usersRef);
                var authData = auth.$getAuth();
                if (authData) {
                    $firebaseArray(usersRef).$loaded().then(function(data){
                        service.data.users = data.$getRecord('users');
                        service.auth = authData;
                    });
                } else {
                    console.log("Logged out");
                }
            },
            login: function(obj){
                console.log('logging in', obj);
                var authRef = new fb(fbRef);
                var authObj = $firebaseAuth(authRef);
                authObj.$authWithPassword({
                    email: obj.email,
                    password: obj.pass
                }).then(function(authData) {
                    service.methods.getData();
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

            },
            save:function(type, key, data){
                var saveRef = fbRef + type + '/' + key;
                var newFb = new fb(saveRef);
                var obj = $firebaseObject(newFb);
                obj.$value = data;
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
                console.log(addRef);
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