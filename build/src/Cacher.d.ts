export default class Cacher {
    private _cache;
    private _functor;
    private _context;
    private _action;
    private _creator;
    context(context_: Object): this;
    functor(functor_: Function): this;
    action(argumentNumber: number): this;
    creator(creator_: Function): this;
    create(): Function;
    clear(): void;
}
