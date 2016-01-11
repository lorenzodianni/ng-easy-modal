'use strict';

angular
.module('Demo', ['ngModal'])
.controller('MainCtrl', ['ModalDelegate', function MainCtrl(ModalDelegate) {
  var main = this;
  main.modal = ModalDelegate;

  main.exampleObject = {
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
