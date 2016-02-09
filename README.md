Anguloader
===========

Angular component which shows a loader screen in case of a pending Http Request.

Maintainer: Zsolt Rádonyi <<radonyi.zsolt@gmail.com>>


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
<link rel="stylesheet" href="path/to/dist/angular-loader.min.css" />
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

As a Tag:
```html
<anguloader></anguloader>
``` 

Configuration
-----

### Config

```javascript
app.config(function(anguloaderConfigProvider){
    anguloaderConfigProvider.setConfig({
        backdrop: false,
        loader: 'default'
    });
});
```

### Blacklist

```javascript
app.config(function(anguloaderConfigProvider){
    anguloaderConfigProvider.setBlackList([
        "http://example.com",
        "http://dummy.com"
    ]);
});
```

### Loader options
```javascript
    'default'
    'waveform'
    'cube'
    'loading'
    'sphere'
    'square'
```

Future Plans
-----

- Add more loader icons
- Prefix All css class
