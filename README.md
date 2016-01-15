# ngEasyModal

A simple directive/delegator for show, get and hide modals. [Demo](http://codepen.io/lorenzodianni/full/adLbBX/)
```sh
$ npm install ng-easy-modal --save
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
}]);
```
Create a new Object for set all EasyModal params
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
Insert inside your .html file:
```html
<div ng-controller="MainCtrl as main">
  <button
    ng-click="main.easyModal.show(main.objectForEasyModal)">
    Show my classic modal
  </button>

  <easy-modal
    ng-if="main.easyModal.status('classic')">
  </easy-modal>
</div>
```

# Style
Insert *ng-easy-modal.css* in the &lt;header&gt; of your .html file
```html
<header>
  <title>Your Title</title>
  ...

  <link rel="stylesheet" href="ng-easy-modal.css">

  ...
</header>
```
CSS classes inside easy-modal directive:
```css
.easy-modal
.easy-modal-box
.easy-modal-box--head
.easy-modal-box--body
.easy-modal-box--footer
.easy-modal-box--footer-btn
.easy-modal-close
```

# API
- EasyModalDelegate.show(object || status, title, body, actions, clickOut)
- EasyModalDelegate.close()
- EasyModalDelegate.get('status')
- EasyModalDelegate.get('title')
- EasyModalDelegate.get('body')
- EasyModalDelegate.get('buttons')
- EasyModalDelegate.get('clickOut')
