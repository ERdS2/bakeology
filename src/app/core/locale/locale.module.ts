import {NgModule} from "@angular/core";
import {LocaleServiceConfig, LocaleServiceConfigToken} from "./service/locale.service.config.model";
import {LocaleService, LocaleServiceToken} from "./service/locale.service";
import {LocaleServiceImpl} from "./service/locale.service.impl";

@NgModule({
    providers: [
        {provide: LocaleServiceToken, useClass: LocaleServiceImpl}
    ]
})
class LocaleModule {}

export {
    LocaleModule,
    LocaleService,
    LocaleServiceConfig,
    LocaleServiceConfigToken,
    LocaleServiceImpl,
    LocaleServiceToken
};
