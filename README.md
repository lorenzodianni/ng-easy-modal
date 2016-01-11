# ngModal

A simple directive/delegator for show, get and hide modals.

# Usage
Load *ngModal.js* library in your index.html file and inject **ngModal** module inside your angular module 
```javascript
angular.module('MyApp', ['ngModal'])
```
Inject **ModalDelegate** inside your controller/service/directive and connect with your scope ($scope or this);
```javascript
.controller('MainCtrl', ['ModalDelegate', function MainCtrl(ModalDelegate) {
    this.modal = ModalDelegate;
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
