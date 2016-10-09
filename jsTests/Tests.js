'use strict';

const Cacher = require( '../index');
console.log('!! Cacher.keys:', Object.keys(Cacher));

describe('JS Babel-less tests', function() {
    it('context-function', function() {
        const testObj = {
            someFn: function() {}
        };
        
        const getOnClick = new Cacher()
            .context(testObj)
            .functor(testObj.someFn)
            .create();

        getOnClick(1)();
    });

    it('action-context-function', function() {
        const testObj = {
            someFn: function() {}
        };

        const getOnClickAction = new Cacher()
            .action()
            .context(testObj)
            .functor(testObj.someFn)
            .create();

        getOnClickAction(1)();
    });
});
