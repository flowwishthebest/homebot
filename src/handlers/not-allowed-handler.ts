import {HandlerInterface} from './handler.interface';
import {BotServiceInterface, CommandInterface} from '../services/bot/bot.service.interface';

export class NotAllowedHandler implements HandlerInterface {
    constructor(
        protected readonly _command: CommandInterface,
        protected readonly _botService: BotServiceInterface
    ) {
    }

    public handle(): void {
        this._botService.message(
            this._command.fromChatId, 'Прости, но тебе нельзя мной пользоваться - тебя нет в списках :('
        ).subscribe(
            () => {},
            (err) => console.error(err)
        )
    }
}