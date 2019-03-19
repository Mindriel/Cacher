"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cacher = (function () {
    function Cacher() {
        this.heldCache = {};
        this.heldFunctor = null;
        this.heldContext = null;
        this.heldAction = null;
    }
    Cacher.prototype.context = function (context) {
        this.heldContext = context;
        return this;
    };
    Cacher.prototype.functor = function (functor) {
        this.heldFunctor = functor;
        return this;
    };
    Cacher.prototype.action = function (argumentNumber) {
        this.heldAction = argumentNumber;
        return this;
    };
    Cacher.prototype.create = function () {
        var cacherContext = this;
        return function () {
            var args = arguments;
            if (!cacherContext.heldCache[args[0]]) {
                cacherContext.heldCache[args[0]] = function () {
                    var _a;
                    if (cacherContext.heldAction) {
                        args[cacherContext.heldAction]();
                    }
                    var callArgs = Array.prototype.slice.call(arguments);
                    (_a = cacherContext.heldFunctor).call.apply(_a, [cacherContext.heldContext, args[0]].concat(callArgs));
                };
            }
            return cacherContext.heldCache[args[0]];
        };
    };
    Cacher.prototype.clear = function () {
        this.heldCache = {};
    };
    return Cacher;
}());
exports.default = Cacher;
