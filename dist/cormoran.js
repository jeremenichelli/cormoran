(function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.cormoran = factory(root);
    }
})(self, function(root) {
    'use strict';

    var cName,
        cNumber,
        query,
        cormoran = {},
        _doc = document,
        ref = _doc.getElementsByTagName('script')[0] || _doc.head || _doc.body;

    cormoran.get = function(url) {
        return new Promise(function(resolve, reject) {

            // if config object doesn't contain url and
            // a success callback method throw an error
            if (typeof url !== 'string') {
                reject('Invalid url');
            }

            var script = _doc.createElement('script'),
                scope = root,
                scopeQuery = 'self.',
                callbackId = cName + cNumber;

            // increase callback number
            cNumber++;

            function onScriptLoaded() { // eslint-disable-line func-style
                // unable callback and data ref
                delete scope[callbackId];

                // erase script element
                script.parentNode.removeChild(script);
            }

            // handle success
            scope[callbackId] = function(data) {
                resolve(data);
                onScriptLoaded();
            };

            // handle error
            script.onerror = function(error) {
                reject(error);
                onScriptLoaded();
            };

            script.src = url + query + '=' + scopeQuery + callbackId;

            // insert strategy supported on Paul Irish post:
            // http://www.paulirish.com/2011/surefire-dom-element-insertion/
            ref.parentNode.insertBefore(script, ref);
        });
    };

    cormoran.naming = function(str) {
        if (typeof str !== 'string') {
            throw new Error('Callback name must be a string');
        } else {
            cName = str;
            cNumber = 0;
            return cormoran;
        }
    };

    cormoran.query = function(str) {
        if (typeof str !== 'string') {
            throw new Error('Query name must be a string');
        } else {
            query = str;
            return cormoran;
        }
    };

    // set default configuration
    cormoran.naming('cormoranCallback');
    cormoran.query('?callback');

    return cormoran;
});
