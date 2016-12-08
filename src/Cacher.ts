export default class Cacher {
    private _cache : Object = {};
    private _functor : Function = null;
    private _context : Object = null;
    private _action : number = null;

    public context(context_ : Object) : this {
        this._context = context_;
        return this;
    }

    public functor(functor_ : Function) : this {
        this._functor = functor_;
        return this;
    }

    public action(argumentNumber : number) : this {
        this._action = argumentNumber;
        return this;
    }

    public create() : Function {
        return (...args) => {
            if (!this._cache[args[0]]) {
                this._cache[args[0]] = (...callArgs) => {
                    if (this._action) {
                        args[this._action]();
                    }
                    this._functor.call(this._context, args[0], ...callArgs);
                };
            }
            return this._cache[args[0]];
        };
    }

    public clear() : void {
        this._cache = {};
    }
}
