import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UtilsModule} from "./utils/utils.module";
import {StateManagementModule} from "./state/state-management.module";

@NgModule({
  imports: [
    CommonModule,
    StateManagementModule,
    UtilsModule,
  ]
})
export class CoreModule {
}
