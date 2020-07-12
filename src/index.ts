// import {container} from './container/container';
// import {diConstants} from './container/di-constants';
// import {AppInterface} from './app.interface';
//
//
// const app = container.resolve<AppInterface>(diConstants.App);
//
// app.bootstrap().catch((err: any) => console.error('Error during bootstrap', err));
//


import {LocaleService} from "./services/locale/locale.service";
import {ELocaleType} from "./services/locale/locale.service.interface";

console.log(new LocaleService().translate('Привет', ELocaleType.EN));