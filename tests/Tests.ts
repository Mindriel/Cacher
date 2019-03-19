import { expect } from "chai";
import Cacher from "../src/Cacher";

describe("Babel-less tests", function() {
    describe("caching", function() {
        it("functors are cached depending on first argument", function() {
            const testObj = {
                called: 0,
                someFn(arg) {
                    this.called += arg;
                },
            };

            let actionCalled = 0;
            const action = function() {
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
            expect(f12).to.equal(getOnClick(12, "blah", null));
            expect(f12).to.equal(getOnClick(12, action, "blah", null));

            const f34 = getOnClick("34", action);
            expect(f34).to.equal(getOnClick("34"));
            expect(f34).to.equal(getOnClick("34", action));
            expect(f34).to.equal(getOnClick("34", "blah", null));
            expect(f34).to.equal(getOnClick("34", action, "blah", null));

            f12();

            expect(testObj.called).to.equal(12);
            expect(actionCalled).to.equal(0);
        });

        it("cache can be cleared explicitly", function() {
            let called = 0;
            function someFn(arg) {
                called += arg;
            }

            const cacher = new Cacher().functor(someFn);
            const getOnClick = cacher.create();

            expect(called).to.equal(0);

            const f12 = getOnClick(12);
            expect(f12).to.equal(getOnClick(12));
            expect(f12).to.equal(getOnClick(12, "blah", null));

            const f34 = getOnClick("34");
            expect(f34).to.equal(getOnClick("34"));
            expect(f34).to.equal(getOnClick("34", "blah", null));

            f12();

            expect(called).to.equal(12);

            cacher.clear();

            const f12Prim = getOnClick(12);
            expect(f12).not.to.equal(getOnClick(12));
            expect(f12).not.to.equal(getOnClick(12, "blah", null));
            expect(f12Prim).to.equal(getOnClick(12));
            expect(f12Prim).to.equal(getOnClick(12, "blah", null));

            const f34Prim = getOnClick("34");
            expect(f34).not.to.equal(getOnClick("34"));
            expect(f34).not.to.equal(getOnClick("34", "blah", null));
            expect(f34Prim).to.equal(getOnClick("34"));
            expect(f34Prim).to.equal(getOnClick("34", "blah", null));

            f12Prim();

            expect(called).to.equal(24);
        });
    });

    describe("action tests", function() {
        it("context-function", function() {
            const testObj = {
                called: 0,
                someFn(arg) {
                    this.called += arg;
                },
            };

            let actionCalled = 0;
            const action = function() {
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

            getOnClick("34", action)();

            expect(testObj.called).to.equal("1234");
            expect(actionCalled).to.equal(0);

            getOnClick("mom", action)();

            expect(testObj.called).to.equal("1234mom");
            expect(actionCalled).to.equal(0);
        });

        it("action-context-function", function() {
            const testObj = {
                called: 0,
                someFn(arg) {
                    this.called += arg;
                },
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

            getOnClickAction("34", action)();

            expect(testObj.called).to.equal("1234");
            expect(actionCalled).to.equal(2);

            getOnClickAction("mom", action)();

            expect(testObj.called).to.equal("1234mom");
            expect(actionCalled).to.equal(3);
        });
    });

    describe("passing aditional arguments", function() {
        it("direct call arguments passed to functor", function() {
            const component1 = "component1";
            const component2 = "component2";

            const base = {};
            function addError(component, error) {
                if (!base[component]) { base[component] = []; }
                if (base[component].includes(error)) { return; }
                base[component].push(error);
            }

            const getter = new Cacher().functor(addError).create();

            getter(component1)("sth");
            getter(component1)("probably");
            getter(component2)("could be");
            getter(component1)("wrong");
            getter(component1)("wrong");

            expect(base).to.deep.equal({
                [component1]: ["sth", "probably", "wrong"],
                [component2]: ["could be"],
            });
        });
    });
});
