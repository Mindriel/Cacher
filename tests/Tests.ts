/// <reference path="../typings/index.d.ts" />

import { expect } from 'chai';
import Cacher from '../src/Cacher';

describe('Babel-less tests', function() {
    it('functors are cached depending on first argument', function () {
        const testObj = {
            called: 0,
            someFn: function (arg) {
                this.called += arg;
            }
        };

        let actionCalled = 0;
        const action = function () {
            actionCalled++;
        };

        const getOnClick = new Cacher()
            .context(testObj)
            .functor(testObj.someFn)
            .create();

        expect(testObj.called).to.equal(0);
        expect(actionCalled).to.equal(0);

        const f12 = getOnClick(12, action);
        expect(f12).to.equal(getOnClick(12));
        expect(f12).to.equal(getOnClick(12, action));
        expect(f12).to.equal(getOnClick(12, 'blah', null));
        expect(f12).to.equal(getOnClick(12, action, 'blah', null));

        const f34 = getOnClick('34', action);
        expect(f34).to.equal(getOnClick('34'));
        expect(f34).to.equal(getOnClick('34', action));
        expect(f34).to.equal(getOnClick('34', 'blah', null));
        expect(f34).to.equal(getOnClick('34', action, 'blah', null));

        f12();

        expect(testObj.called).to.equal(12);
        expect(actionCalled).to.equal(0);
    });

    describe('action tests', function() {
        it('context-function', function () {
            const testObj = {
                called: 0,
                someFn: function (arg) {
                    this.called += arg;
                }
            };

            let actionCalled = 0;
            const action = function () {
                actionCalled++;
            };

            const getOnClick = new Cacher()
                .context(testObj)
                .functor(testObj.someFn)
                .create();

            expect(testObj.called).to.equal(0);
            expect(actionCalled).to.equal(0);

            getOnClick(12, action)();

            expect(testObj.called).to.equal(12);
            expect(actionCalled).to.equal(0);

            getOnClick('34', action)();

            expect(testObj.called).to.equal('1234');
            expect(actionCalled).to.equal(0);

            getOnClick('mom', action)();

            expect(testObj.called).to.equal('1234mom');
            expect(actionCalled).to.equal(0);
        });

        it('action-context-function', function() {
            const testObj = {
                called: 0,
                someFn: function (arg) {
                    this.called += arg;
                }
            };

            let actionCalled = 0;
            const action = function() { actionCalled++; };

            const getOnClickAction = new Cacher()
                .action(1)
                .context(testObj)
                .functor(testObj.someFn)
                .create();

            expect(testObj.called).to.equal(0);
            expect(actionCalled).to.equal(0);

            getOnClickAction(12, action)();

            expect(testObj.called).to.equal(12);
            expect(actionCalled).to.equal(1);

            getOnClickAction('34', action)();

            expect(testObj.called).to.equal('1234');
            expect(actionCalled).to.equal(2);

            getOnClickAction('mom', action)();

            expect(testObj.called).to.equal('1234mom');
            expect(actionCalled).to.equal(3);
        });
    });
});
