'use strict';

/* App Module */
var hackEtherCampApp = angular.module('hackEtherCampApp', []);


function generalController($scope, $http){

    $scope.invite = function(user) {

        console.log(user);
        var gotAnswer = false;
        $("#emailField").fadeOut( "slow", function() {
            if (!gotAnswer) {
                $("#inviteResponse").text("Processing");
                $("#responsePanel").fadeIn( "slow");
            }
        });

        $http({
            method: 'POST',
            url: '/invite-slack',
            data: {
                email: $scope.user.email
            },
            headers: {}
        }).success( function(response) {
            gotAnswer = true;
            $("#responsePanel").fadeOut("slow", function() {
                $("#inviteResponse").text("Check your email the invite should be waiting for you");
                $("#responsePanel").fadeIn( "slow");
            });

            console.log("the registration process succefully started")
        }).error(function (data, status, headers, config) {
                gotAnswer = true;

                $("#responsePanel").fadeOut("slow", function() {
                    if (status == 409) {
                        $("#inviteResponse").text("Your email address is already registered. Please check it for the invite.");
                        console.log("an attempt to use already invited email");
                    } else {
                        $("#inviteResponse").text("We got some problems with inviting you now. Please try again soon.");
                        console.log("Unknown error: " + data);
                    }

                    $("#responsePanel").fadeIn("slow");
                });
        });
    };


}


hackEtherCampApp.controller('generalController', generalController);


