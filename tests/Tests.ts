/// <reference path="../typings/index.d.ts" />

import Cacher from '../src/Cacher';

describe('Babel-less tests', function() {
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
            .action(1)
            .context(testObj)
            .functor(testObj.someFn)
            .create();

        getOnClickAction(1, ()=>{})();
    });
});
