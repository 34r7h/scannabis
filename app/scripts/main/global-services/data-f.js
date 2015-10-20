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
    .factory('Data', function ($firebaseObject, $firebaseArray, $firebaseAuth)
    {
        'use strict';
        var service = {methods:{}, data:{}};
        // INITIALIZATION

        // ACTUAL DEFINITION
        service.methods = {
            getData: function(){
                var usersRef = new fb(fbRef);
                var auth = $firebaseAuth(usersRef);
                var authData = auth.$getAuth();
                if (authData) {
                    $firebaseArray(usersRef).$loaded().then(function(data){
                        service.data.users = data.$getRecord('users');
                        console.log("Logged in as:", authData.uid);})
                } else {
                    console.log("Logged out");
                }
            },
            login: function(obj){
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
                console.log(saveRef);
                var newFb = new fb(saveRef);
                var obj = $firebaseObject(newFb);
                console.log(obj);
                obj.$value = data;
                obj.$save();
            }
        };
        service.methods.getData();
        return service;
    });