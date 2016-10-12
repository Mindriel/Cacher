"use strict";
var Cacher = (function () {
    function Cacher() {
        this._cache = {};
        this._functor = null;
        this._context = null;
        this._action = null;
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
    Cacher.prototype.create = function () {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (!_this._cache[args[0]]) {
                _this._cache[args[0]] = function () {
                    if (_this._action) {
                        args[_this._action]();
                    }
                    _this._functor.call(_this._context, args[0]);
                };
            }
            return _this._cache[args[0]];
        };
    };
    return Cacher;
}());
exports.__esModule = true;
exports["default"] = Cacher;
