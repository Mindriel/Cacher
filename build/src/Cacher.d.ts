export default class Cacher {
    private _cache;
    private _functor;
    private _context;
    private _action;
    context(context_: Object): this;
    functor(functor_: Function): this;
    action(argumentNumber: number): this;
    create(): Function;
}
