Anguloader
===========

Angular component which shows a loader screen in case of a pending Http Request.

Maintainer: Zsolt Rádonyi <<radonyi.zsolt@gmail.com>>


This module requires the Angular-UI $modal service http://angular-ui.github.io/bootstrap/#/modal.

Installation
------------

Bower:

```sh
bower install --save anguloader
```

Usage
-----

Load angular-loader.min.js and angular-loader.min.css:

```html
<link rel="stylesheet" href="path/to/dist/angular-loader.css" />
<script src="path/to/dist/angular-loader.min.js"></script>
```

Add the `anguloader` module as a dependency in your application:

```javascript
angular.module('demo', ['anguloader'])
```

Add an HTML element with the `anguloader` directive. This will be displayed
while requests are pending

As an attribute:
```html
<div anguloader></div>
```

As a Class:
```html
<div class="anguloader"></div>
```

As a Tag:
```html
<anguloader></anguloader>
```

### You don't like the default spinner icon?

Just add some Html code inside your wrapper.

As an attribute:
```html
<div anguloader><i>I am a spinner</i></div>
```

As a Class:
```html
<div class="anguloader"><i>I am an other spinner</i></div>
```

As a Tag:
```html
<anguloader><i>Spinner, spinner, spinner</i></anguloader>
```

### Early bird config 

You can configurate the backdrop option just add a 
```html 
data-anguloader-backgrop="true/false"
```
attribute.

