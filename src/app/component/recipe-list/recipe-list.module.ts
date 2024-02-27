import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipeListComponent} from "./recipe-list.component";
import {RecipeCardModule} from "../../feature/recipe-card/recipe-card.module";



@NgModule({
  declarations: [RecipeListComponent],
  imports: [
    CommonModule,
    RecipeCardModule,
  ],
  exports: [
    RecipeListComponent
  ]
})
export class RecipeListModule { }
