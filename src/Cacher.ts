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
        const cacherContext = this;
        return function() {
            const args = arguments;
            if (!cacherContext._cache[args[0]]) {
                cacherContext._cache[args[0]] = function() {
                    if (cacherContext._action) {
                        args[cacherContext._action]();
                    }
                    const callArgs = Array.prototype.slice.call(arguments);
                    cacherContext._functor.call(cacherContext._context, args[0], ...callArgs);
                };
            }
            return cacherContext._cache[args[0]];
        };
    }

    public clear() : void {
        this._cache = {};
    }
}
