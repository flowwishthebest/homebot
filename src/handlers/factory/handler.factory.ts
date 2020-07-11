import {HandlerFactoryInterface} from './handler.factory.interface';
import {inject, injectable} from 'tsyringe';
import {BotServiceInterface, CommandInterface, ECommand} from '../../services/bot/bot.service.interface';
import {HandlerInterface} from '../handler.interface';
import {diConstants} from '../../container/di-constants';
import {NotAllowedHandler} from '../not-allowed-handler';
import {PhotoHandler} from '../photo-handler';
import {UnknownHandler} from '../unknown-handler';

@injectable()
export class HandlerFactory implements HandlerFactoryInterface {
    constructor(
        @inject(diConstants.BotServiceInterface)
        protected readonly _botService: BotServiceInterface,
    ) {
    }

    public getHandler(command: CommandInterface): HandlerInterface {
        if (command.type === ECommand.NOT_ALLOWED) {
            return new NotAllowedHandler(command, this._botService);
        }

        if (command.type === ECommand.PHOTO) {
            return new PhotoHandler(command, this._botService);
        }

        return new UnknownHandler(command, this._botService);
    }
}