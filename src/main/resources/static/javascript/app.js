'use strict';

/* App Module */
var hackEtherCampApp = angular.module('hackEtherCampApp', []);


function generalController($scope, $http){

    $scope.invite = function(user) {

        console.log(user);

        $http({
            method: 'POST',
            url: '/invite-slack',
            data: {
                email: $scope.user.email
            },
            headers: {}
        }).success( function(response){

            console.log("the registration process succefully started")
        });
    };


}


hackEtherCampApp.controller('generalController', generalController);


