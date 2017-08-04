/// <reference path="../typings/index.d.ts" />

import { expect } from 'chai';
import Cacher from '../src/Cacher';

describe('Objects caching:', function() {
    it('objects are cached depending on first argument', function () {
        function someCreator() {
            return {};
        }

        const getter = new Cacher()
            .creator(someCreator)
            .create();

        const id_1 = 'blablaIDblabla';

        const o1_1 = getter('blablaIDblabla');
        const o2_1 = getter(2);
        const o2_2 = getter(2);
        const o1_2 = getter(1);

        expect(o1_1).to.equal(o1_2);
        expect(o1_1).to.equal(getter(id_1));
        expect(o1_1).to.equal(getter(id_1, function() { return 'boom'; }));
        expect(o1_1).to.equal(getter(id_1, 'blah', null));
        expect(o1_1).to.equal(getter(id_1, function() { return 'boom'; }, 'blah', null));

        expect(o2_1).to.equal(o2_2);
        expect(o2_1).to.equal(getter(id_1));
        expect(o2_1).to.equal(getter(id_1, function() { return 'boom'; }));
        expect(o2_1).to.equal(getter(id_1, 'blah', null));
        expect(o2_1).to.equal(getter(id_1, function() { return 'boom'; }, 'blah', null));
    });

    it('can\'t create a getter for both objects and functors', function () {
        function someFunction() {}

        const cacher = new Cacher()
            .creator(someFunction)
            .functor(someFunction);

        return Promise.resolve()
            .then(function () {
                cacher.create();
            })
            .then(
                () => { throw new Error('Should fail'); },
                err => err
            );
    });
});
