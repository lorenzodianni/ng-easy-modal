'use strict';

(function () {
  function EasyModalDelegate() {
    var __currents = {};

    var service = {
      show: show,
      status: status,
      get: get,
      close: close
    };

    return service;

    function EasyModal() {
      this.status = arguments[0].status || arguments[0];
      this.title = arguments[0].title || arguments[1];
      this.body = arguments[0].body || arguments[2];
      this.buttons = arguments[0].buttons || arguments[3];
      this.clickOut = arguments[0].clickOut || arguments[4] || false;
    }

    function show() {
      __currents[arguments[0].status] = new EasyModal(arguments[0]);
    }

    function close() {
      var keys = Object.keys(__currents);
      var lastIndex = keys.length - 1;
      var lastOne = keys[lastIndex];

      delete __currents[lastOne];
    }

    function status(value) {
      return __currents[value];
    }

    function get(key) {
      if (Object.keys(__currents).length) {

        var statuses = [];

        for (var _status in __currents) {
          statuses.push(_status);
        }

        for (var i = statuses.length - 1; i >= 0; i--) {
          return __currents[statuses[i]][key];
        }
      }
    }
  }

  function EasyModalDirective() {
    return {
      scope: {
        easyModal: '=ngIf',
        resetTemplate: '=?'
      },
      bindToController: true,
      controller: ['EasyModalDelegate', EasyModalController],
      controllerAs: 'vm',
      transclude: true,
      replace: true,
      template: '\n        <div class="easy-modal">\n          <div class="easy-modal-box" ng-class="{\'is-large\': !vm.resetTemplate}">\n            <div class="easy-modal-box--head" ng-if="!vm.resetTemplate">{{vm.easyModal.title}}</div>\n            <div class="easy-modal-box--body" ng-if="!vm.resetTemplate">\n              <p>{{vm.easyModal.body}}</p>\n              <div ng-transclude></div>\n            </div>\n            <div class="easy-modal-box--footer" ng-if="!vm.resetTemplate">\n              <button class="easy-modal-box--footer-btn"\n                ng-repeat="button in vm.easyModal.buttons"\n                ng-click="button.action($event)">\n                {{button.label}}\n              </button>\n            </div>\n            <div ng-transclude ng-if="vm.resetTemplate"></div>\n          </div>\n          <div class="easy-modal-close" ng-click="vm.easyModal.clickOut ? vm.close() : false"></div>\n        </div>\n      '
    };

    function EasyModalController(EasyModalDelegate) {
      this.close = EasyModalDelegate.close;
    }
  }

  angular.module('ngEasyModal', []).factory('EasyModalDelegate', [EasyModalDelegate]).directive('easyModal', [EasyModalDirective]);
})();