import {Observable} from 'rxjs';

export interface CommandInterface {
    type: ECommand,
    fromUserId: string | number;
    fromChatId: string | number;
    meta: any;
}

export enum ECommand {
    PHOTO = 'PHOTO',
    UNKNOWN = 'UNKNOWN',
    NOT_ALLOWED = 'NOT_ALLOWED'
}

export interface BotServiceInterface {
    commands(): Observable<CommandInterface>;
    message(toUserId: string | number, message: string): Observable<void>;
    photo(toUserId: string | number, buffer: Buffer): Observable<void>;
}