'use strict';

(function () {
  function EasyModalDelegate() {
    var service = {
      show: show,
      close: close,
      status: status,
      current: {
        get: get,
        status: null,
        title: null,
        body: null,
        actions: null,
        clickOut: false
      }
    };

    return service;

    function show(value, title, body, actions, clickOut) {
      service.current.status = value.status || value;
      service.current.title = value.title || title;
      service.current.body = value.body || body;
      service.current.actions = value.actions || actions;
      service.current.clickOut = value.clickOut || clickOut || false;
    }

    function close() {
      service.current.status = null;
      service.current.title = null;
      service.current.body = null;
      service.current.actions = null;
      service.current.clickOut = false;
    }

    function status(value) {
      return service.current.status === value;
    }

    function get(key) {
      return service.current[key];
    }
  }

  function EasyModalDirective() {
    return {
      scope: {},
      bindToController: true,
      controller: ['EasyModalDelegate', EasyModalController],
      controllerAs: 'easyModal',
      transclude: true,
      template: '\n        <div class="modal">\n          <div class="modal-head">{{easyModal.get(\'title\')}}</div>\n          <div class="modal-body">\n            {{easyModal.get(\'body\')}}\n            <div ng-transclude></div>\n          </div>\n          <div class="modal-footer">\n            <button class="button"\n              ng-repeat="button in easyModal.get(\'actions\')"\n              ng-click="button.action(); easyModal.close();">\n              {{button.label}}\n            </button>\n          </div>\n        </div>\n        <div class="modal-close" ng-click="easyModal.get(\'clickOut\') ? easyModal.close() : easyModal.get(\'clickOut\')"></div>\n      '
    };

    function EasyModalController(EasyModalDelegate) {
      /*jshint validthis:true */
      this.get = EasyModalDelegate.current.get;
      this.close = EasyModalDelegate.close;
    }
  }

  angular.module('ngEasyModal', []).factory('EasyModalDelegate', [EasyModalDelegate]).directive('easyModal', [EasyModalDirective]);
})();