'use strict';

var hackEtherCampApp = angular.module('hackEtherCampApp', []);

angular.module('hackEtherCampApp').factory('MailProviders', function() {

  var providers = {
    'gmail':        'https://mail.google.com',
    'hotmail':      'https://hotmail.com/default.aspx?rru=inbox',
    'icloud.com':   'https://www.icloud.com/mail',
    'mail.ru':      'https://e.mail.ru',
    'outlook.com':  'https://outlook.com',
    'yahoo':        'https://mail.yahoo.com',
    'yandex.ru':    'https://mail.yandex.ru'
  }

  var patterns = Object.keys(providers);

  return {
    getInbox: function(email) {

      for (var i = 0; i < patterns.length; i++) {
        var pattern = patterns[i];
        if (email.toLowerCase().indexOf(pattern) >= 0) {
          return providers[pattern];
        }
      }

      return null;
    }
  }
});
