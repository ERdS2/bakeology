import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageComponent} from "./main-page.component";
import {HeaderModule} from "../header/header.module";
import {RecipeCardModule} from "../../feature/recipe-card/recipe-card.module";
import {StoreModule} from "@ngrx/store";
import {mainPageReducer} from "./reducer/main-page.reducer";
import {RECIPE_LIST_STATE_NAME} from "./model/recipeList.state.model";
import {MainpageService} from "../../../../mock/backend-api/services/mainpage.service";
import {MainPageActionFactoryToken} from "./action/main-page.action-factory";
import {RecipeListModule} from "../recipe-list/recipe-list.module";
import {RouterOutlet} from "@angular/router";
import {AddRecipeModule} from "../add-recipe/add-recipe.module";
import {ResourceModule} from "../../core/resource/resource.module";
import {ButtonModule} from "primeng/button";
import {MainPageActionFactoryImpl} from "./action/main-page.action.factory.impl";

@NgModule({
  declarations: [MainPageComponent],
  exports: [MainPageComponent],
  imports: [
    CommonModule,
    HeaderModule,
    RecipeCardModule,
    AddRecipeModule,
    StoreModule.forFeature(RECIPE_LIST_STATE_NAME, mainPageReducer),
    RecipeListModule,
    RouterOutlet,
    ResourceModule,
    ButtonModule
  ],
  providers: [
    MainpageService,
    {provide: MainPageActionFactoryToken, useClass: MainPageActionFactoryImpl}
  ]
})
class MainPageModule { }

export {
  MainPageModule,
  MainPageComponent
};
