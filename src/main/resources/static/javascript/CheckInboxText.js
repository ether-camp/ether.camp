'use strict';

angular.module('hackEtherCampApp').factory('CheckInboxText', ['MailProviders',
  function(MailProviders) {

    return {
      generate: function(email, action) {

        var inboxLink = MailProviders.getInbox(email);
        var inbox;
        if (inboxLink != null) {
          inbox = '<a class="link-yellow" href="' + inboxLink + '">inbox</a>'; 
        } else {
          inbox = 'inbox';
        }

        return inbox;
      }
    }
    
}]);
