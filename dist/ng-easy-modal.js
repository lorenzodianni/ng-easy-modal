'use strict';

(function () {
  function EasyModalDelegate() {
    var service = {
      show: show,
      close: close,
      status: status,
      get: get,
      current: []
    };

    return service;

    function show() /* value, title, body, buttons, clickOut */{
      var easyModal = {
        status: arguments[0].status || arguments[0],
        title: arguments[0].title || arguments[1],
        body: arguments[0].body || arguments[2],
        buttons: arguments[0].buttons || arguments[3],
        clickOut: arguments[0].clickOut || arguments[4] || false
      };

      __getCurrent().push(easyModal);
    }

    function close() {
      var index = __getCurrent().length - 1;
      __getCurrent().splice(index, 1);
    }

    function status(value) {
      var statusArray = [];

      for (var i in __getCurrent()) {
        statusArray.push(__getCurrent()[i].status);
      }

      return statusArray.indexOf(value) >= 0;
    }

    function get(key) {
      if (__getCurrent().length) {
        var current = null;

        for (var i in __getCurrent()) {
          current = __getCurrent()[i];
        }

        return current[key];
      }
    }

    function __getCurrent() {
      return service.current;
    }
  }

  function EasyModalDirective() {
    return {
      scope: {},
      bindToController: true,
      controller: ['EasyModalDelegate', EasyModalController],
      controllerAs: 'easyModal',
      transclude: true,
      replace: true,
      template: '\n        <div class="easy-modal">\n          <div class="easy-modal-box">\n            <div class="easy-modal-box--head">{{easyModal.get(\'title\')}}</div>\n            <div class="easy-modal-box--body">\n              <p>{{easyModal.get(\'body\')}}</p>\n              <div ng-transclude></div>\n            </div>\n            <div class="easy-modal-box--footer">\n              <button class="easy-modal-box--footer-btn"\n                ng-repeat="button in easyModal.get(\'buttons\')"\n                ng-click="button.action($event)">\n                {{button.label}}\n              </button>\n            </div>\n          </div>\n          <div class="easy-modal-close" ng-click="easyModal.get(\'clickOut\') ? easyModal.close() : easyModal.get(\'clickOut\')"></div>\n        </div>\n      '
    };

    function EasyModalController(EasyModalDelegate) {
      /*jshint validthis:true */
      this.get = EasyModalDelegate.get;
      this.close = EasyModalDelegate.close;
    }
  }

  angular.module('ngEasyModal', []).factory('EasyModalDelegate', [EasyModalDelegate]).directive('easyModal', [EasyModalDirective]);
})();