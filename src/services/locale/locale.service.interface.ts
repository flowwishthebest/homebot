export interface LocaleServiceInterface {
    translate(str: string, locale?: string): string;
    translatePlurals(phrase: string, count: number, locale?: string): string;
}

export enum ELocaleType {
    EN = 'en',
    RU = 'ru',
}