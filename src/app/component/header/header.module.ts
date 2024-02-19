import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header.coponent";
import {MenuModule} from "../menu/menu-module";

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    MenuModule,
  ]
})
class HeaderModule { }

export {
  HeaderModule,
  HeaderComponent
};
