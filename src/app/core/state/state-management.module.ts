import { NgModule } from "@angular/core";
import { CoreAction } from "./model/core.action.model";
import { UtilsModule } from "../utils/utils.module";


@NgModule({
  imports: [
    UtilsModule,
  ],
  providers: [
  ]
})
class StateManagementModule {
}

export {
  StateManagementModule,
  CoreAction,
};
