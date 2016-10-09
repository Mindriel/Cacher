export default class Cacher {
    _cache = {};
    _functor = null;
    _context = null;

    context(context_) {
        this._context = context_;
        return this;
    }

    functor(functor_) {
        this._functor = functor_;
        return this;
    }

    action() {
        this._action = 1;
        return this;
    }

    create() {
        return (...args) => {
            if (!this._cache[args[0]]) {
                this._cache[args[0]] = () => {
                    if (this._action) {
                        args[this._action]();
                    }
                    this._functor.call(this._context, args[0]);
                };
            }
            return this._cache[args[0]];
        };
    }
}
