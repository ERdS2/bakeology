import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuComponent} from "./menu";
import {MenuItemModule} from "../manuitem/menu-item.module";

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [
    CommonModule,
    MenuItemModule
  ]
})
class MenuModule { }

export {
  MenuModule,
  MenuComponent
};
