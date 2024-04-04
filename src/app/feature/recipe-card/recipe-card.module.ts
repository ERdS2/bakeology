import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipeCardComponent} from "./recipe-card.coponent";
import {ToggleButtonModule} from "primeng/togglebutton";



@NgModule({
  declarations: [
    RecipeCardComponent
  ],
    imports: [
        CommonModule,
        ToggleButtonModule
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
