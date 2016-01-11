'use strict';

(() => {
  function ModalDelegate() {
    let service = {
      show,
      close,
      status,
      current: {
        get,
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
      template: `
        <div class="modal">
          <div class="modal-head">{{modal.get('title')}}</div>
          <div class="modal-body">
            {{modal.get('body')}}
            <div ng-transclude></div>
          </div>
          <div class="modal-footer">
            <button class="button"
              ng-repeat="button in modal.get('actions')"
              ng-click="button.action(); modal.close();">
              {{button.label}}
            </button>
          </div>
        </div>
        <div class="modal-close" ng-click="modal.get('clickOut') ? modal.close() : modal.get('clickOut')"></div>
      `
    };

    function modalController(ModalDelegate) {
      /*jshint validthis:true */
      this.get = ModalDelegate.current.get;
      this.close = ModalDelegate.close;
    }
  }

  angular
  .module('ngModal', [])
  .factory('ModalDelegate', [ModalDelegate])
  .directive('modal', [modalDirective]);
})();
