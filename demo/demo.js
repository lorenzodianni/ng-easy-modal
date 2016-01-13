'use strict';

angular
.module('MyApp', ['ngEasyModal'])
.controller('MainCtrl', ['EasyModalDelegate', function MainCtrl(EasyModalDelegate) {
  this.easyModal = EasyModalDelegate;
  this.exampleObject = {
    status: 'classic',
    title: 'Classic example',
    body: 'You can close me only with my buttons, not with a click out event',
    buttons: [{
      label: 'Disagree',
      action: function(e){
        alert('Disagree');
        console.log(e);
      }
    }, {
      label: 'Agree',
      action: function(e){
        alert('Agree');
        console.log(e);
      }
    }],
    clickOut: false
  };
}]);
