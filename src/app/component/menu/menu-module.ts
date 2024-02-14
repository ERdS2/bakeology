import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuComponent} from "./menu.coponent";

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [
    CommonModule,
  ]
})
class MenuModule { }

export {
  MenuModule,
  MenuComponent,
};
