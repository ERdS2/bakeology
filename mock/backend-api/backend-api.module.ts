import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainpageService} from "./services/mainpage.service";
import {RecipeService} from "./services/recipe.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    MainpageService,
    RecipeService
  ]
})
export class BackendApiModule {

}
