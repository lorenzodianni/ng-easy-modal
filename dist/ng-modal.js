'use strict';

(function () {
  function ModalDelegate() {
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

  function modalDirective() {
    return {
      scope: {},
      bindToController: true,
      controller: ['ModalDelegate', modalController],
      controllerAs: 'modal',
      transclude: true,
      template: '\n        <div class="modal">\n          <div class="modal-head">{{modal.get(\'title\')}}</div>\n          <div class="modal-body">\n            {{modal.get(\'body\')}}\n            <div ng-transclude></div>\n          </div>\n          <div class="modal-footer">\n            <button class="button"\n              ng-repeat="button in modal.get(\'actions\')"\n              ng-click="button.action(); modal.close();">\n              {{button.label}}\n            </button>\n          </div>\n        </div>\n        <div class="modal-close" ng-click="modal.get(\'clickOut\') ? modal.close() : modal.get(\'clickOut\')"></div>\n      '
    };

    function modalController(ModalDelegate) {
      /*jshint validthis:true */
      this.get = ModalDelegate.current.get;
      this.close = ModalDelegate.close;
    }
  }

  angular.module('ngModal', []).factory('ModalDelegate', [ModalDelegate]).directive('modal', [modalDirective]);
})();