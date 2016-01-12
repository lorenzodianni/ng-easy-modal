'use strict';

(() => {
  function EasyModalDelegate() {
    let service = {
      show,
      close,
      status,
      current: {
        get,
        status: null,
        title: null,
        body: null,
        buttons: null,
        clickOut: false
      }
    };

    return service;

    function show(value, title, body, buttons, clickOut) {
      service.current.status = value.status || value;
      service.current.title = value.title || title;
      service.current.body = value.body || body;
      service.current.buttons = value.buttons || buttons;
      service.current.clickOut = value.clickOut || clickOut || false;
    }

    function close() {
      service.current.status = null;
      service.current.title = null;
      service.current.body = null;
      service.current.buttons = null;
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
      template: `
        <div class="modal">
          <div class="modal-head">{{easyModal.get('title')}}</div>
          <div class="modal-body">
            {{easyModal.get('body')}}
            <div ng-transclude></div>
          </div>
          <div class="modal-footer">
            <button class="button"
              ng-repeat="button in easyModal.get('buttons')"
              ng-click="button.action(); easyModal.close();">
              {{button.label}}
            </button>
          </div>
        </div>
        <div class="modal-close" ng-click="easyModal.get('clickOut') ? easyModal.close() : easyModal.get('clickOut')"></div>
      `
    };

    function EasyModalController(EasyModalDelegate) {
      /*jshint validthis:true */
      this.get = EasyModalDelegate.current.get;
      this.close = EasyModalDelegate.close;
    }
  }

  angular
  .module('ngEasyModal', [])
  .factory('EasyModalDelegate', [EasyModalDelegate])
  .directive('easyModal', [EasyModalDirective]);
})();
