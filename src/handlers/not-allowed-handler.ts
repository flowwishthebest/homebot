import {
    BotServiceInterface,
    CommandInterface,
} from '../services/bot/bot.service.interface';
import {HandlerInterface, IHandlerCtx} from './handler.interface';
import {LocaleServiceInterface} from "../services/locale/locale.service.interface";

export class NotAllowedHandler implements HandlerInterface {

    constructor(
        protected readonly _command: CommandInterface,
        protected readonly _botService: BotServiceInterface,
        protected readonly _localeService: LocaleServiceInterface,
    ) {}

    public handle(ctx?: IHandlerCtx): void {
        const localedMsg = this._localeService.translate(
            'Прости, но тебе нельзя мной пользоваться - тебя нет в списках :(',
            ctx?.locale,
        );

        this._botService.message(this._command.fromChatId, localedMsg)
            .subscribe(() => {}, (err) => console.error(err));
    }
}
