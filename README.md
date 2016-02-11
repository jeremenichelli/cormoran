# cormoran

[![Build Status](https://travis-ci.org/jeremenichelli/cormoran.svg)](https://travis-ci.org/jeremenichelli/cormoran)

Light weight library to manage JSONP calls using Promises

## Install

Download the distribution version and include it on your web project or add it as a dependency

```sh
npm install cormoran --save
```

## Use

If you know how Promises in JavaScript work and what is a JSONP call, then you don't need much else.

Require the package or use the global `cormoran` namespace and run `get`passing a *url*, pipe a `then` statement to handle the data you've received and `catch` just in case something goes wrong.

```js
var cormoran = require('cormoran');

cormoran
    .get('https://api.github.com/users/jeremenichelli')
    .then(function(data) {
        console.log(data);
    })
    .catch(function(e) {
        console.error(e);
    });
```

## Configuration

As the callback name and query can changed depending on the API you're trying to reach you can change both of them running this two methods before using the `get` method.

### naming

```js
cormoran.naming('JSONP_CALLBACK');
```

### query

```js
cormoran.query('?callback');
```

_Following the first example the final url would be *https://api.github.com/users/jeremenichelli?callback=JSONP_CALLBACK0*, a number will be added at the end of every callback name to make them unique._

## Notes

Since these library relies on Promises remember to include a polyfill for browsers which don't support this feature. I recommend Jake Archibald's Promise polyfill: https://github.com/jakearchibald/es6-promise


