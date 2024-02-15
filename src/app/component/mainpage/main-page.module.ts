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
import {MainPageActionFactoryImp} from "./action/main-page.action.factory.imp";

@NgModule({
  declarations: [MainPageComponent],
  exports: [MainPageComponent],
  imports: [
    CommonModule,
    HeaderModule,
    RecipeCardModule,
    StoreModule.forFeature(RECIPE_LIST_STATE_NAME, mainPageReducer)
  ],
  providers: [
    MainpageService,
    {provide: MainPageActionFactoryToken, useClass: MainPageActionFactoryImp}
  ]
})
class MainPageModule { }

export {
  MainPageModule,
  MainPageComponent
};
