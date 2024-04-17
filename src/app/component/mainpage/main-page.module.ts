import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageComponent} from "./main-page.component";
import {HeaderModule} from "../header/header.module";
import {RecipeCardModule} from "../../feature/recipe-card/recipe-card.module";
import {StoreModule} from "@ngrx/store";
import {recipeReducer} from "../recipe/reducer/recipe.reducer";
import {RouterOutlet} from "@angular/router";
import {ResourceModule} from "../../core/resource/resource.module";
import {ButtonModule} from "primeng/button";
import {RecipeService} from "../../../../mock/backend-api/services/recipe.service";
import {RecipeModule} from "../recipe/recipe.module";
import {RecipeActionFactoryToken} from "../recipe/action/recipe.action-factory";
import {RecipeActionFactoryImpl} from "../recipe/action/recipe.action.factory.impl";
import {RECIPE_STATE_NAME} from "../recipe/model/recipe.state.model";

@NgModule({
  declarations: [MainPageComponent],
  exports: [MainPageComponent],
  imports: [
    CommonModule,
    HeaderModule,
    RecipeCardModule,
    RecipeModule,
    StoreModule.forFeature(RECIPE_STATE_NAME, recipeReducer),
    RouterOutlet,
    ButtonModule,
    ResourceModule
  ],
  providers: [
    RecipeService,
    {provide: RecipeActionFactoryToken, useClass: RecipeActionFactoryImpl}
  ]
})
class MainPageModule { }

export {
  MainPageModule,
  MainPageComponent
};
