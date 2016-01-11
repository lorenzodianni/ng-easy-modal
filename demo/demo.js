'use strict';

angular
.module('MyApp', ['ngModal'])
.controller('MainCtrl', ['ModalDelegate', function MainCtrl(ModalDelegate) {
  this.modal = ModalDelegate;
  this.exampleObject = {
    status: 'classic',
    title: 'Classic example',
    body: 'You can close me only with my buttons, not with a click out event',
    actions: [{
      label: 'Disagree',
      action: function(){
        alert('Disagree');
      }
    }, {
      label: 'Agree',
      action: function(){
        alert('Agree');
      }
    }],
    clickOut: false
  };
}]);
