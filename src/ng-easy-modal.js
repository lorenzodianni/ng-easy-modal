'use strict';

(() => {
  function EasyModalDelegate() {
    let service = {
      show,
      close,
      status,
      get,
      current: {
        status: null,
        title: null,
        body: null,
        buttons: null,
        clickOut: null
      }
    };

    return service;

    function show() /* value, title, body, buttons, clickOut */{
      service.current.status = arguments[0].status || arguments[0];
      service.current.title = arguments[0].title || arguments[1];
      service.current.body = arguments[0].body || arguments[2];
      service.current.buttons = arguments[0].buttons || arguments[3];
      service.current.clickOut = arguments[0].clickOut || arguments[4] || false;
    }

    function close() {
      for (let key in service.current) {
        service.current[key] = null;
      }
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
      replace: true,
      template: `
        <div class="easy-modal">
          <div class="easy-modal-box">
            <div class="easy-modal-box--head">{{easyModal.get('title')}}</div>
            <div class="easy-modal-box--body">
              <p>{{easyModal.get('body')}}</p>
              <div ng-transclude></div>
            </div>
            <div class="easy-modal-box--footer">
              <button class="easy-modal-box--footer-btn"
                ng-repeat="button in easyModal.get('buttons')"
                ng-click="button.action($event); easyModal.close();">
                {{button.label}}
              </button>
            </div>
          </div>
          <div class="easy-modal-close" ng-click="easyModal.get('clickOut') ? easyModal.close() : easyModal.get('clickOut')"></div>
        </div>
      `
    };

    function EasyModalController(EasyModalDelegate) {
      /*jshint validthis:true */
      this.get = EasyModalDelegate.get;
      this.close = EasyModalDelegate.close;
    }
  }

  angular
  .module('ngEasyModal', [])
  .factory('EasyModalDelegate', [EasyModalDelegate])
  .directive('easyModal', [EasyModalDirective]);
})();
