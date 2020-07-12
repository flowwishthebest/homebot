import {
    BotServiceInterface,
    CommandInterface,
} from '../services/bot/bot.service.interface';
import {HandlerInterface, IHandlerCtx} from './handler.interface';
import {from, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Raspivid} from 'node-raspivideo';
import * as fs from 'fs';
import * as path from 'path';
import {LocaleServiceInterface} from "../services/locale/locale.service.interface";

export class VideoHandler implements HandlerInterface {

    protected readonly _videoName: string = 'video';
    protected readonly _convertedVideoName: string = 'video_converted';
    protected readonly _videoDuration: number = 30 * 1000;
    protected readonly _videoFolder: string = './videos';
    protected readonly _videoFormat: any = 'mp4';

    protected readonly _raspivideo = new Raspivid({
        videoFolder: this._videoFolder,
        format: this._videoFormat
    });

    constructor(
        protected readonly _command: CommandInterface,
        protected readonly _botService: BotServiceInterface,
        protected readonly _localeService: LocaleServiceInterface,
    ) {}

    public handle(ctx?: IHandlerCtx): void {
        const localedMessage = this._localeService.translate(
            'Сейчас попробую... Ролик будет на 30 секунд, запись и отправка займет время.',
            ctx?.locale,
        );

        this._botService.message(this._command.fromChatId, localedMessage)
            .subscribe(() => {}, (err) => console.error(err));

        from(this._raspivideo.record(this._videoName, this._videoDuration)).pipe(
            switchMap((photo) => {
                const filepath = path.join(
                    this._videoFolder,
                    `${this._convertedVideoName}.${this._videoFormat}`,
                );

                return of(fs.createReadStream(filepath));
            }),
            switchMap((stream) => {
                return this._botService.video(this._command.fromUserId, stream)
            })
        ).subscribe(() => {}, (err) => console.error(err));
    }
}
