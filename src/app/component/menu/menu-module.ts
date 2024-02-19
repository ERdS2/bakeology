import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuComponent} from "./menu.coponent";
import {ResourceModule} from "../../core/resource/resource.module";

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [
    CommonModule,
    ResourceModule
  ]
})
class MenuModule { }

export {
  MenuModule,
  MenuComponent,
};
