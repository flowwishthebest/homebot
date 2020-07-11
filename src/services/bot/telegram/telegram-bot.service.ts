import {BotServiceInterface, CommandInterface, ECommand} from '../bot.service.interface';
import {from, Observable, Subject} from 'rxjs';
import TelegramBot, {Message} from 'node-telegram-bot-api';
import {catchError, map, tap} from 'rxjs/operators';
import {TelegramBotConfig} from './telegram-bot.service.interface';
import {inject, singleton} from 'tsyringe';
import {diConstants} from '../../../container/di-constants';
import {ConfigInterface} from '../../../../config/config.interface';

@singleton()
export class TelegramBotService implements BotServiceInterface {
    protected readonly _bot: TelegramBot;
    protected readonly _commandsStream: Subject<Message> = new Subject<Message>();
    protected readonly _config: TelegramBotConfig;

    private readonly _photoCommand: string = '/photo';

    constructor(
        @inject(diConstants.ConfigInterface)
        protected readonly config: ConfigInterface
    ) {
        this._config = {
            token: config.telegramToken,
            allowlist: config.telegramUsersAllowlist
        }

        this._bot = new TelegramBot(this._config.token, {polling: true});

        this._bot.on('message', (msg) => {
            this._commandsStream.next(msg);
        });
    }

    public commands(): Observable<CommandInterface> {
        return from(this._commandsStream).pipe(
            tap((msg) => {
                console.log('got message', msg);
            }),
            map<Message, CommandInterface>((msg) => {
                let command = ECommand.UNKNOWN;

                if (msg.text?.trim() === this._photoCommand) {
                    command = ECommand.PHOTO;
                }

                console.log(this._config);

                if (!this._config.allowlist.includes(msg.from?.id ?? msg.chat.id)) {
                    command = ECommand.NOT_ALLOWED;
                } else if (
                    msg.text === this._photoCommand
                ) {
                    command === ECommand.PHOTO;
                } else {
                    command = ECommand.UNKNOWN;
                }

                return {
                    type: command,
                    fromUserId: msg.from?.id || msg.chat.id,
                    fromChatId: msg.chat.id,
                    meta: {}
                };
            }
        ));
    }

    public message(toId: string | number, message: string): Observable<void> {
        return from(this._bot.sendMessage(toId, message)).pipe(
            catchError((err, obs) => {
                console.error(err.message);

                return obs;
            }),
            map(() => undefined)
        );
    }

    public photo(toId: string | number, buffer: Buffer): Observable<void> {
        return from(this._bot.sendPhoto(toId, buffer)).pipe(
            catchError((err, obs) => {
                console.error(err.message);

                return obs;
            }),
            map(() => undefined)
        );
    }

}