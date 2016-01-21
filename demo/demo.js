'use strict';

angular
.module('MyApp', ['ngEasyModal'])
.controller('MainCtrl', ['EasyModalDelegate', function MainCtrl(EasyModalDelegate) {
  var main = this;
  main.easyModal = EasyModalDelegate;

  var examples = [{
    status: 'Classic',
    labels: ['One', 'Two', 'Three'],
    clickOut: false
  }, {
    status: 'Click Out',
    labels: ['One', 'Two', 'Three'],
    clickOut: true
  }, {
    status: 'Transclude',
    labels: ['One', 'Two', 'Three'],
    clickOut: false
  }];

  examples.forEach(function(example){
    example.labels.forEach(function(label) {

      var key = toCamelCase(example.status) + label;
      var status = example.status;
      var clickOut = example.clickOut;

      main[key] = {
        status: toCamelCase(status),
        title: status + ' ' + label,
        body: 'I\'m a ' + status.toLowerCase() + ' ' + label.toLowerCase() + ' example body',
        buttons: [{
          label: 'Disagree ' + status + ' ' + label,
          action: function($event) {
            printInfo('Disagree ' + status + ' ' + label);
            EasyModalDelegate.close();
          }
        }, {
          label: 'Agree ' + status + ' ' + label,
          action: function($event) {
            printInfo('Agree ' + status + ' ' + label);
            EasyModalDelegate.close();
          }
        }, {
          label: 'Open OverAll',
          action: function($event) {
            printInfo('Open OverAll');
            EasyModalDelegate.show({status: 'overAll'});
          }
        }],
        clickOut: clickOut
      };

    });
  });

  function printInfo(info) {
    main.currentAction = info;
  }

  function toCamelCase(string) {
    return string.toLowerCase().replace(/\s(.)/g, function(letter) { return letter.toUpperCase(); }).replace(/\s/g, '');
  }

}]);
