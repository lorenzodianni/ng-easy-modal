# ngEasyModal

A simple directive/delegator for show, get and hide modals.
```bash
$ npm install ng-easy-modal --save-dev
```

# Usage
Load *ng-easy-modal.js* library in your index.html file and inject **ngEasyModal** module inside your angular module
```javascript
angular.module('MyApp', ['ngEasyModal'])
```
Inject **EasyModalDelegate** inside your controller/service/directive and connect with your scope ($scope or this);
```javascript
.controller('MainCtrl', ['EasyModalDelegate', function MainCtrl(EasyModalDelegate) {
    this.modal = EasyModalDelegate;
}]);
```

# API
- show(object || status, title, body, actions, clickOut)
- close()
- current.get('status')
- current.get('title')
- current.get('body')
- current.get('actions')
- current.get('clickOut')
