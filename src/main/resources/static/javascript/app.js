'use strict';

/* App Module */
var hackEtherCampApp = angular.module('hackEtherCampApp', []);


function generalController($scope, $http){

    $scope.invite = function(user) {

        console.log(user);

        $("#emailField").fadeOut( "slow", function() {

            $("#inviteResponse").text("Processing");
            $("#responsePanel").fadeIn( "slow");

        });

        $http({
            method: 'POST',
            url: '/invite-slack',
            data: {
                email: $scope.user.email
            },
            headers: {}
        }).success( function(response){

            $("#inviteResponse").text("Check your email the invite should be waiting for you");

            console.log("the registration process succefully started")
        }).error(function (data, status, headers, config) {
            if (status == 409) {
                $("#inviteResponse").text("Your email address is already registered. Please check it for the invite.");
                console.log("an attempt to use already invited email")
            }
        });  
    };


}


hackEtherCampApp.controller('generalController', generalController);


