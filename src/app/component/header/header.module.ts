import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header.coponent";
import {MenuModule} from "../menu/menu-module";
import {ResourceModule} from "../../core/resource/resource.module";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
    imports: [
        CommonModule,
        MenuModule,
        ResourceModule,
        RouterLink
    ]
})
class HeaderModule { }

export {
  HeaderModule,
  HeaderComponent
};
