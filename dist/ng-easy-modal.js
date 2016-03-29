'use strict';

(function () {
  function EasyModalDelegate() {

    var _currents = {};

    var service = {
      close: close,
      get: get,
      show: show,
      status: status
    };

    function show(newEasyModal) {
      _currents[newEasyModal.status] = new EasyModal(newEasyModal);
    }

    function close() {
      var keys = Object.keys(_currents);
      var lastIndex = keys.length - 1;
      var lastOne = keys[lastIndex];

      delete _currents[lastOne];
    }

    function status(value) {
      return _currents[value];
    }

    function get(key) {
      if (Object.keys(_currents).length) {

        var _statuses = [];

        for (var _status in _currents) {
          _statuses.push(_status);
        }

        for (var i = _statuses.length - 1; i >= 0; i--) {
          return _currents[_statuses[i]][key];
        }
      }
    }

    function EasyModal(newEasyModal) {
      this.status = newEasyModal.status;
      this.title = newEasyModal.title;
      this.body = newEasyModal.body;
      this.buttons = newEasyModal.buttons;
      this.clickOut = newEasyModal.clickOut === false ? false : true;
      this.templateUrl = newEasyModal.templateUrl || false;
    }

    EasyModal.prototype = {
      close: close
    };

    return service;
  }

  function EasyModalDirective() {
    return {
      scope: {
        easyModal: '=ngIf',
        resetTemplate: '=?'
      },
      bindToController: true,
      controller: [function EasyModalController() {}],
      controllerAs: 'vm',
      transclude: true,
      replace: true,
      template: '\n        <div class="easy-modal">\n          <div class="easy-modal-box" ng-class="{\'is-large\': !vm.resetTemplate && !vm.easyModal.templateUrl}">\n\n            <div ng-if="!vm.resetTemplate && !vm.easyModal.templateUrl">\n              <div class="easy-modal-box--head">{{vm.easyModal.title}}</div>\n              <div class="easy-modal-box--body">\n                <p>{{vm.easyModal.body}}</p>\n                <div ng-transclude></div>\n              </div>\n              <div class="easy-modal-box--footer">\n                <button class="easy-modal-box--footer-btn"\n                  ng-repeat="button in vm.easyModal.buttons"\n                  ng-click="button.action($event)">\n                  {{button.label}}\n                </button>\n              </div>\n            </div>\n\n            <div\n              ng-include="vm.easyModal.templateUrl"\n              ng-if="vm.easyModal.templateUrl && !vm.resetTemplate">\n            </div>\n\n            <div ng-transclude ng-if="vm.resetTemplate"></div>\n          </div>\n          <div class="easy-modal-close" ng-click="vm.easyModal.clickOut ? vm.easyModal.close() : false"></div>\n        </div>\n      '
    };
  }

  angular.module('ngEasyModal', []).factory('EasyModalDelegate', [EasyModalDelegate]).directive('easyModal', [EasyModalDirective]);
})();