export interface IHandlerCtx {
    locale?: string;
}

export interface HandlerInterface {
    handle(ctx?: IHandlerCtx): void;
}
