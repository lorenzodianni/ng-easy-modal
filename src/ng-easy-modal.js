'use strict';

(() => {
  function EasyModalDelegate() {
    let service = {
      show,
      close,
      status,
      get,
      current: []
    };

    return service;

    function show() /* value, title, body, buttons, clickOut */ {
      let easyModal = {
        status: arguments[0].status || arguments[0],
        title: arguments[0].title || arguments[1],
        body: arguments[0].body || arguments[2],
        buttons: arguments[0].buttons || arguments[3],
        clickOut: arguments[0].clickOut || arguments[4] || false
      };

      __getCurrent().push(easyModal);
    }

    function close() {
      let index = __getCurrent().length - 1;
      __getCurrent().splice(index, 1);
    }

    function status(value) {
      let statusArray = [];

      for(let i in __getCurrent()) {
        statusArray.push(__getCurrent()[i].status);
      }

      return statusArray.indexOf(value) >= 0;
    }

    function get(key) {
      if(__getCurrent().length) {
        let current = null;

        for(let i in __getCurrent()) {
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
                ng-click="button.action($event)">
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
