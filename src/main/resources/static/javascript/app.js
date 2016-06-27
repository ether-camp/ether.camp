'use strict';

/* App Module */
var hackEtherCampApp = angular.module('hackEtherCampApp');

function generalController($scope, $http, $sce, CheckInboxText){

        $scope.invite = function(user) {

            console.log(user);
            var email = user.email;
            var emailHref = CheckInboxText.generate(email);
            var checkInbox = "Check your " + emailHref + " the invite should be waiting for you";
            var alreadyInvitedMsg = "Your email address is already registered. Please check " + emailHref + " for the invite."
            var gotAnswer = false;
            $("#inputs").fadeOut( "slow", function() {
                if (!gotAnswer) {
                    $scope.responseText = $sce.trustAsHtml("Processing");
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
                    $scope.$apply(function() {
                        $scope.responseText = $sce.trustAsHtml(checkInbox);
                    });

                    $("#responsePanel").fadeIn( "slow");
                });

                console.log("the registration process successfully started")
            }).error(function (data, status, headers, config) {
                    gotAnswer = true;
                    var response = null;

                    $("#responsePanel").fadeOut("slow", function() {
                        $scope.$apply(function() {
                            if (status == 409) {
                                $scope.responseText = $sce.trustAsHtml(alreadyInvitedMsg);
                                console.log("an attempt to use already invited email");
                            } else {
                                $scope.responseText = $sce.trustAsHtml("We got some problems with inviting you now. Please try again soon.");
                                console.log("Unknown error: " + data);
                            }
                        });
                        $("#responsePanel").fadeIn("slow");
                    });
            });
        };
}


hackEtherCampApp.controller('generalController', ['$scope', '$http', '$sce', 'CheckInboxText', generalController]);


