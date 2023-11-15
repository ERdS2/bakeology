import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header";
import {MenuItemModule} from "../manuitem/menu-item.module";
import {MenuModule} from "../menu/menu-module";



@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    MenuItemModule,
    MenuModule,

  ]
})
class HeaderModule { }

export {
  HeaderModule,
  HeaderComponent
};
