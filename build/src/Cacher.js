"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cacher = (function () {
    function Cacher() {
        this._cache = {};
        this._functor = null;
        this._context = null;
        this._action = null;
        this._creator = null;
    }
    Cacher.prototype.context = function (context_) {
        this._context = context_;
        return this;
    };
    Cacher.prototype.functor = function (functor_) {
        this._functor = functor_;
        return this;
    };
    Cacher.prototype.action = function (argumentNumber) {
        this._action = argumentNumber;
        return this;
    };
    Cacher.prototype.creator = function (creator_) {
        this._creator = creator_;
        return this;
    };
    Cacher.prototype.create = function () {
        var cacherContext = this;
        return function () {
            var args = arguments;
            if (!cacherContext._cache[args[0]]) {
                cacherContext._cache[args[0]] = function () {
                    if (cacherContext._action) {
                        args[cacherContext._action]();
                    }
                    var callArgs = Array.prototype.slice.call(arguments);
                    (_a = cacherContext._functor).call.apply(_a, [cacherContext._context, args[0]].concat(callArgs));
                    var _a;
                };
            }
            return cacherContext._cache[args[0]];
        };
    };
    Cacher.prototype.clear = function () {
        this._cache = {};
    };
    return Cacher;
}());
exports.default = Cacher;
