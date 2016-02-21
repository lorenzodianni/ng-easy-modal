'use strict';

(() => {
  function EasyModalDelegate() {

    let _currents = {};

    let service = {
      close,
      get,
      show,
      status
    };

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

    function EasyModal() {
      this.status = arguments[0].status;
      this.title = arguments[0].title;
      this.body = arguments[0].body;
      this.buttons = arguments[0].buttons;
      this.clickOut = arguments[0].clickOut === false ? false : true;
      this.templateUrl = arguments[0].templateUrl || false;
    }

    EasyModal.prototype.close = close;

    return service;

  }

  function EasyModalDirective() {
    return {
      scope: {
        easyModal: '=ngIf',
        resetTemplate: '=?'
      },
      bindToController: true,
      controller: [function EasyModalController(){}],
      controllerAs: 'vm',
      transclude: true,
      replace: true,
      template: `
        <div class="easy-modal">
          <div class="easy-modal-box" ng-class="{'is-large': !vm.resetTemplate && !vm.easyModal.templateUrl}">

            <div ng-if="!vm.resetTemplate && !vm.easyModal.templateUrl">
              <div class="easy-modal-box--head">{{vm.easyModal.title}}</div>
              <div class="easy-modal-box--body">
                <p>{{vm.easyModal.body}}</p>
                <div ng-transclude></div>
              </div>
              <div class="easy-modal-box--footer">
                <button class="easy-modal-box--footer-btn"
                  ng-repeat="button in vm.easyModal.buttons"
                  ng-click="button.action($event)">
                  {{button.label}}
                </button>
              </div>
            </div>

            <div
              ng-include="vm.easyModal.templateUrl"
              ng-if="vm.easyModal.templateUrl && !vm.resetTemplate">
            </div>

            <div ng-transclude ng-if="vm.resetTemplate"></div>
          </div>
          <div class="easy-modal-close" ng-click="vm.easyModal.clickOut ? vm.easyModal.close() : false"></div>
        </div>
      `
    };
  }

  angular
  .module('ngEasyModal', [])
  .factory('EasyModalDelegate', [EasyModalDelegate])
  .directive('easyModal', [EasyModalDirective]);
})();
