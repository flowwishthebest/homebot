import {HandlerInterface} from './handler.interface';
import {BotServiceInterface, CommandInterface} from '../services/bot/bot.service.interface';
import {from, of, zip} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {Raspivid} from 'node-raspivideo';
import * as fs from 'fs';

export class VideoHandler implements HandlerInterface {
    protected readonly _videoName: string = 'video';
    protected readonly _videoDuration: number = 30 * 1000;
    protected readonly _videoFolder: string = './videos';
    protected readonly _videoFormat: any = 'mp4';

    protected readonly _raspivideo = new Raspivid({
        videoFolder: this._videoFolder,
        format: this._videoFormat
    });

    constructor(
        protected readonly _command: CommandInterface,
        protected readonly _botService: BotServiceInterface
    ) {
    }

    public handle(): void {
        this._botService.message(
            this._command.fromChatId,
            'Сейчас попробую... Ролик будет на 30 секунд, запись и отправка займет время.'
        )
            .subscribe(() => {}, (err) => console.error(err));

        from(this._raspivideo.record(this._videoName, this._videoDuration)).pipe(
            switchMap((photo) => {
                return of(fs.createReadStream(
                    this._videoFolder + '/' + this._videoName + '.' + this._videoFormat
                ));
            }),
            switchMap((stream) => {
                return this._botService.video(this._command.fromUserId, stream)
            })
        ).subscribe(() => {}, (err) => console.error(err));
    }
}