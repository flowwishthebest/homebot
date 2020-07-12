import 'reflect-metadata';
import {container} from 'tsyringe';
import {ConfigInterface} from '../../config/config.interface';
import {diConstants} from './di-constants';
import * as config from 'config';
import {BotServiceInterface} from '../services/bot/bot.service.interface';
import {TelegramBotService} from '../services/bot/telegram/telegram-bot.service';
import {App} from '../app';
import {AppInterface} from '../app.interface';
import {HandlerFactory} from '../handlers/factory/handler.factory';
import {HandlerFactoryInterface} from '../handlers/factory/handler.factory.interface';
import {LocaleServiceInterface} from "../services/locale/locale.service.interface";
import {LocaleService} from "../services/locale/locale.service";

container.register<ConfigInterface>(diConstants.ConfigInterface, {
    useValue: config as any,
});

container.register<BotServiceInterface>(diConstants.BotServiceInterface, {
    useClass: TelegramBotService,
}, {lifecycle: 1}); // singleton lifecycle

container.register<AppInterface>(diConstants.App, {
    useClass: App,
});

container.register<HandlerFactoryInterface>(diConstants.HandlerFactory, {
    useClass: HandlerFactory,
});

container.register<LocaleServiceInterface>(diConstants.LocaleServiceInterface, {
    useClass: LocaleService,
});

export {container};

