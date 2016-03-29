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

    function show(newEasyModal) {
      _currents[newEasyModal.status] = new EasyModal(newEasyModal);
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

        var _statuses = [];

        for (let status in _currents) {
          _statuses.push(status);
        }

        for (let i = _statuses.length-1; i >= 0; i--) {
          return _currents[_statuses[i]][key];
        }

      }
    }

    function EasyModal(newEasyModal) {
      this.status = newEasyModal.status;
      this.title = newEasyModal.title;
      this.body = newEasyModal.body;
      this.buttons = newEasyModal.buttons;
      this.clickOut = newEasyModal.clickOut === false ? false : true;
      this.templateUrl = newEasyModal.templateUrl || false;
    }

    EasyModal.prototype = {
      close: close
    };

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
