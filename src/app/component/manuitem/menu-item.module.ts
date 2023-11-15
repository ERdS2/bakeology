import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuItemComponent} from "./menu-item";



@NgModule({
  declarations: [MenuItemComponent],
  exports: [MenuItemComponent],
  imports: [
    CommonModule
  ]
})
class MenuItemModule { }
export {
  MenuItemComponent,
  MenuItemModule
}
