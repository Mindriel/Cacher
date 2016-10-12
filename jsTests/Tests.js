'use strict';

const expect = require('chai').expect;
const Cacher = require('../index');

describe('JS :: Babel-less tests', function() {
    it('context-function', function() {
        const testObj = {
            called: 0,
            someFn: function() { this.called++; }
        };

        var actionCalled = 0;
        const action = function() { actionCalled++; };

        const getOnClick = new Cacher()
            .context(testObj)
            .functor(testObj.someFn)
            .create();

        getOnClick(1, action)();

        expect(testObj.called).to.equal(1);
        expect(actionCalled).to.equal(0);
    });

    it('action-context-function', function() {
        const testObj = {
            called: 0,
            someFn: function() { this.called++; }
        };

        var actionCalled = 0;
        const action = function() { actionCalled++; };

        const getOnClickAction = new Cacher()
            .action(1)
            .context(testObj)
            .functor(testObj.someFn)
            .create();

        getOnClickAction(1, action)();

        expect(testObj.called).to.equal(1);
        expect(actionCalled).to.equal(1);
    });
});
