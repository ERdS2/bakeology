import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipeCardComponent} from "./recipe-card.coponent";
import {ToggleButtonModule} from "primeng/togglebutton";
import {ResourceModule} from "../../core/resource/resource.module";



@NgModule({
  declarations: [
    RecipeCardComponent
  ],
    imports: [
      CommonModule,
      ToggleButtonModule,
      ResourceModule,

    ],
  exports: [
    RecipeCardComponent
  ]
})
class RecipeCardModule { }

export {
  RecipeCardComponent,
  RecipeCardModule
}
