import {HandlerInterface} from './handler.interface';
import {BotServiceInterface, CommandInterface} from '../services/bot/bot.service.interface';

export class UnknownHandler implements HandlerInterface {
    constructor(
        protected readonly _command: CommandInterface,
        protected readonly _botService: BotServiceInterface
    ) {
    }

    public handle(): void {
        this._botService.message(
            this._command.fromChatId, 'Прости, я тебя не понял :( Я обязательно пойму когда-нибудь!'
        ).subscribe(
            () => {},
            (err) => console.error(err)
        )
    }
}