import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipeCardComponent} from "./recipe-card.coponent";



@NgModule({
  declarations: [
    RecipeCardComponent
  ],
  imports: [
    CommonModule
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
