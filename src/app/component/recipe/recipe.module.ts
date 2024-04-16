import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddRecipeComponent} from "./component/add-recipe.component";
import {ResourceModule} from "../../core/resource/resource.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputNumberModule} from "primeng/inputnumber";
import {RecipeService} from "../../../../mock/backend-api/services/recipe.service";
import {RecipeListComponent} from "./component/recipe-list.component";
import {RecipeCardModule} from "../../feature/recipe-card/recipe-card.module";
import {RecipeActionFactoryToken} from "./action/recipe.action-factory";
import {RecipeActionFactoryImpl} from "./action/recipe.action.factory.impl";
import {ToggleButtonModule} from "primeng/togglebutton";
@NgModule({
  declarations: [
    AddRecipeComponent,
    RecipeListComponent
  ],
  imports: [
    CommonModule,
    ResourceModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    BrowserAnimationsModule,
    InputNumberModule,
    RecipeCardModule,
    ToggleButtonModule,

  ],
  providers: [
    RecipeService,
    {provide: RecipeActionFactoryToken, useClass: RecipeActionFactoryImpl}
  ],
  exports: [
    RecipeListComponent,
  ]
})
export class RecipeModule { }
