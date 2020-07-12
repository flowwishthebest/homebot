import i18n from 'i18n';
import path from 'path';
import {LocaleServiceInterface, ELocaleType} from "./locale.service.interface";

const filepath = path.join(process.cwd(), 'config', 'locales');

console.log('Resolved filepath', filepath);
console.log('Enum', ELocaleType);

i18n.configure({
    locales: Object.keys(ELocaleType),
    defaultLocale: ELocaleType.RU,
    directory: filepath,
});

export class LocaleService implements LocaleServiceInterface {

    public translate(phrase: string, locale?: string): string {
        return i18n.__({phrase, locale});
    }

    public translatePlurals(phrase: string, count: number, locale?: string): string {
        return i18n.__n({ locale, singular: phrase, plural: phrase }, count);
    }
}
