import {HandlerInterface, IHandlerCtx} from './handler.interface';
import {BotServiceInterface, CommandInterface} from '../services/bot/bot.service.interface';
import {Raspistill} from 'node-raspistill';
import {from} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {LocaleServiceInterface} from "../services/locale/locale.service.interface";

export class PhotoHandler implements HandlerInterface {

    protected readonly _raspistill = new Raspistill({
        encoding: 'jpg',
        noFileSave: true,
        noPreview: true,
    })

    constructor(
        protected readonly _command: CommandInterface,
        protected readonly _botService: BotServiceInterface,
        protected readonly _localeService: LocaleServiceInterface,
    ) {}

    public handle(ctx?: IHandlerCtx): void {
        const localedMsg = this._localeService.translate(
            'Сейчас попробую... Подожди немного',
            ctx?.locale,
        );

        this._botService.message(this._command.fromChatId, localedMsg)
            .subscribe(() => {}, (err) => console.error(err));

        from(this._raspistill.takePhoto()).pipe(
            switchMap((photo) => {
                return this._botService.photo(
                    this._command.fromChatId, photo,
                );
            })
        ).subscribe(() => {}, (err) => console.error(err));
    }
}