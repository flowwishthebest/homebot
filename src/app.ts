import {AppInterface} from './app.interface';
import {BotServiceInterface} from './services/bot/bot.service.interface';
import {inject, injectable} from 'tsyringe';
import {diConstants} from './container/di-constants';
import {HandlerFactory} from './handlers/factory/handler.factory';

@injectable()
export class App implements AppInterface {
    constructor(
        @inject(diConstants.BotServiceInterface)
        protected readonly _botService: BotServiceInterface,
        @inject(diConstants.HandlerFactory)
        protected readonly _handlerFactory: HandlerFactory,
    ) {
    }

    public async bootstrap(): Promise<void> {
        this._botService.commands().subscribe((command) => {
            this._handlerFactory.getHandler(command).handle()
        });
    }
}