import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageComponent} from "./main-page";
import {HeaderModule} from "../header/header.module";
import {RecipeCardModule} from "../recipe-card/recipe-card.module";

@NgModule({
  declarations: [MainPageComponent],
  exports: [MainPageComponent],
  imports: [
    CommonModule,
    HeaderModule,
    RecipeCardModule
  ]
})
class MainPageModule { }

export {
  MainPageModule,
  MainPageComponent
};
