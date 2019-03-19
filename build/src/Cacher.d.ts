export default class Cacher {
    private heldCache;
    private heldFunctor;
    private heldContext;
    private heldAction;
    context(context: Object): this;
    functor(functor: Function): this;
    action(argumentNumber: number): this;
    create(): Function;
    clear(): void;
}
