/* tslint:disable:ban-types */

export default class Cacher {
    private heldCache: Object = {};
    private heldFunctor: Function = null;
    private heldContext: Object = null;
    private heldAction: number = null;

    public context(context: Object): this {
        this.heldContext = context;
        return this;
    }

    public functor(functor: Function): this {
        this.heldFunctor = functor;
        return this;
    }

    public action(argumentNumber: number): this {
        this.heldAction = argumentNumber;
        return this;
    }

    public create(): Function {
        const cacherContext = this;
        return function() {
            const args = arguments;
            if (!cacherContext.heldCache[args[0]]) {
                cacherContext.heldCache[args[0]] = function() {
                    if (cacherContext.heldAction) {
                        args[cacherContext.heldAction]();
                    }
                    const callArgs = Array.prototype.slice.call(arguments);
                    cacherContext.heldFunctor.call(cacherContext.heldContext, args[0], ...callArgs);
                };
            }
            return cacherContext.heldCache[args[0]];
        };
    }

    public clear(): void {
        this.heldCache = {};
    }
}
