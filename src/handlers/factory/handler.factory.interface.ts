import {CommandInterface} from '../../services/bot/bot.service.interface';
import {HandlerInterface} from '../handler.interface';

export interface HandlerFactoryInterface {
    getHandler(command: CommandInterface): HandlerInterface;
}