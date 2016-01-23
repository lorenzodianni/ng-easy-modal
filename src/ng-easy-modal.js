'use strict';

(() => {
  function EasyModalDelegate() {
    let _currents = {};

    let service = {
      show,
      status,
      get,
      close
    };

    return service;

    function EasyModal() {
      this.status = arguments[0].status;
      this.title = arguments[0].title;
      this.body = arguments[0].body;
      this.buttons = arguments[0].buttons;
      this.clickOut = arguments[0].clickOut === false ? false : true;
    }

    function show() {
      _currents[arguments[0].status] = new EasyModal(arguments[0]);
    }

    function close() {
      let keys = Object.keys(_currents);
      let lastIndex = keys.length - 1;
      let lastOne = keys[lastIndex];

      delete _currents[lastOne];
    }

    function status(value) {
      return _currents[value];
    }

    function get(key) {
      if(Object.keys(_currents).length) {

        var statuses = [];

        for (let status in _currents) {
          statuses.push(status);
        }

        for (let i = statuses.length-1; i >= 0; i--) {
          return _currents[statuses[i]][key];
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
      template: `
        <div class="easy-modal">
          <div class="easy-modal-box" ng-class="{'is-large': !vm.resetTemplate}">
            <div class="easy-modal-box--head" ng-if="!vm.resetTemplate">{{vm.easyModal.title}}</div>
            <div class="easy-modal-box--body" ng-if="!vm.resetTemplate">
              <p>{{vm.easyModal.body}}</p>
              <div ng-transclude></div>
            </div>
            <div class="easy-modal-box--footer" ng-if="!vm.resetTemplate">
              <button class="easy-modal-box--footer-btn"
                ng-repeat="button in vm.easyModal.buttons"
                ng-click="button.action($event)">
                {{button.label}}
              </button>
            </div>
            <div ng-transclude ng-if="vm.resetTemplate"></div>
          </div>
          <div class="easy-modal-close" ng-click="vm.easyModal.clickOut ? vm.close() : false"></div>
        </div>
      `
    };

    function EasyModalController(EasyModalDelegate) {
      this.close = EasyModalDelegate.close;
    }
  }

  angular
  .module('ngEasyModal', [])
  .factory('EasyModalDelegate', [EasyModalDelegate])
  .directive('easyModal', [EasyModalDirective]);
})();
