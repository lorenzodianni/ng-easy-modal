# ngEasyModal

A simple directive/delegator for show, get and hide modals.
```sh
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
    this.easyModal = EasyModalDelegate;
    this.objectForEasyModal = {
      // Status or ID (you will call it for show/hide this EasyModal)
      status: 'classic',
      // Title
      title: 'My EasyModal Title',
      // Content
      body: 'My EasyModal body text',
      // Buttons (label and action)
      buttons: [{
        label: 'Disagree',
        action: function(){
          alert('Disagree');
        }
      }, {
        label: 'Agree',
        action: function(){
          alert('Agree');
        }
      }],
      // Close on clickOut
      clickOut: false
    };
}]);
```
Insert inside your HTML file:
```html
<button
  ng-click="MainCtrl.easyModal.show(MainCtrl.objectForEasyModal)">
  Show my classic modal
</button>

<easy-modal
  ng-if="MainCtrl.easyModal.status('classic')">
</easy-modal>
```

# API
- EasyModalDelegate.show(object || status, title, body, actions, clickOut)
- EasyModalDelegate.close()
- EasyModalDelegate.current.get('status')
- EasyModalDelegate.current.get('title')
- EasyModalDelegate.current.get('body')
- EasyModalDelegate.current.get('buttons')
- EasyModalDelegate.current.get('clickOut')
