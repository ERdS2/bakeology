import {NgModule} from "@angular/core";
import {ResolvePipe} from "./pipe/resolve.pipe";
import {ResourceMap, ResourcePackage, ResourcePackageToken} from "./model/resource.model";
import {ResourceService, ResourceServiceToken} from "./service/resource.service";
import {ResourceServiceImpl} from "./service/resource.service.impl";
import {HasResourceDirective} from "./directive/hasresource.directive";
import { LocaleModule } from "../locale/locale.module";

@NgModule({
    imports: [
        LocaleModule
    ],
    declarations: [
        ResolvePipe,
        HasResourceDirective
    ],
    exports: [
        ResolvePipe,
        HasResourceDirective
    ],
    providers: [
        {provide: ResourceServiceToken, useClass: ResourceServiceImpl}
    ]
})
class ResourceModule {
}

export {
    ResourceModule,
    ResolvePipe,
    HasResourceDirective,
    ResourceMap,
    ResourcePackage,
    ResourcePackageToken,
    ResourceService,
    ResourceServiceToken,
    ResourceServiceImpl
};
