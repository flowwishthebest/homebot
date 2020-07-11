import {HandlerInterface} from './handler.interface';
import {BotServiceInterface, CommandInterface} from '../services/bot/bot.service.interface';
import {Raspistill} from 'node-raspistill';
import {from, of, zip} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

export class PhotoHandler implements HandlerInterface {
    protected readonly _raspistill = new Raspistill({
        encoding: 'jpg',
        noFileSave: true,
        noPreview: true,
    })

    constructor(
        protected readonly _command: CommandInterface,
        protected readonly _botService: BotServiceInterface
    ) {
    }

    public handle(): void {
        this._botService.message(this._command.fromChatId, 'Сейчас попробую... Подожди немного')
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