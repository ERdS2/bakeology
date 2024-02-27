import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuComponent} from "./menu.coponent";
import {ResourceModule} from "../../core/resource/resource.module";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
    imports: [
        CommonModule,
        ResourceModule,
        RouterLink
    ]
})
class MenuModule { }

export {
  MenuModule,
  MenuComponent,
};
