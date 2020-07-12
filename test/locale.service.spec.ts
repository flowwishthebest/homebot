import {container} from '../src/container/container';
import {diConstants} from "../src/container/di-constants";
import {
    ELocaleType,
    LocaleServiceInterface
} from "../src/services/locale/locale.service.interface";
import * as path from "path";
import {LocaleService} from "../src/services/locale/locale.service";

describe('Locale service test', () => {
    it('Basic phrase', () => {
        const localeService = container.resolve<LocaleServiceInterface>(
            diConstants.LocaleServiceInterface,
        );

        expect(localeService).toBeDefined();

        console.log(path.join(process.cwd(), 'config/locales'));
        const localedHello = new LocaleService().translate('Привет', 'en');

        expect(localedHello).toBe('Hello');
    });
});
