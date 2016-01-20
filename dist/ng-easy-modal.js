'use strict';

(function () {
  function EasyModalDelegate() {
    var __currents = {};

    var service = {
      show: show,
      close: close,
      status: status,
      get: get
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
      var lastKey = keys.length - 1;
      var lastOne = keys[lastKey];

      delete __currents[lastOne];
    }

    function status(easyModal) {
      return __currents[easyModal];
    }

    function get(key) {
      if (Object.keys(__currents).length) {

        for (var easyModal in __currents) {
          return __currents[easyModal][key];
        }
      }
    }
  }

  function EasyModalDirective() {
    return {
      scope: {
        resetTemplate: '='
      },
      bindToController: true,
      controller: ['EasyModalDelegate', EasyModalController],
      controllerAs: 'easyModal',
      transclude: true,
      replace: true,
      template: '\n        <div class="easy-modal">\n          <div class="easy-modal-box" ng-class="{\'is-large\': !easyModal.resetTemplate}">\n            <div class="easy-modal-box--head" ng-if="!easyModal.resetTemplate">{{easyModal.get(\'title\')}}</div>\n            <div class="easy-modal-box--body" ng-if="!easyModal.resetTemplate">\n              <p>{{easyModal.get(\'body\')}}</p>\n              <div ng-transclude></div>\n            </div>\n            <div class="easy-modal-box--footer" ng-if="!easyModal.resetTemplate">\n              <button class="easy-modal-box--footer-btn"\n                ng-repeat="button in easyModal.get(\'buttons\')"\n                ng-click="button.action($event)">\n                {{button.label}}\n              </button>\n            </div>\n            <div ng-transclude ng-if="easyModal.resetTemplate"></div>\n          </div>\n          <div class="easy-modal-close" ng-click="easyModal.get(\'clickOut\') ? easyModal.close() : easyModal.get(\'clickOut\')"></div>\n        </div>\n      '
    };

    function EasyModalController(EasyModalDelegate) {
      /*jshint validthis:true */
      this.get = EasyModalDelegate.get;
      this.close = EasyModalDelegate.close;
    }
  }

  angular.module('ngEasyModal', []).factory('EasyModalDelegate', [EasyModalDelegate]).directive('easyModal', [EasyModalDirective]);
})();