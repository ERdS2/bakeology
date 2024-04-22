import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddRecipeComponent} from "./component/add-recipe.component";
import {ResourceModule, ResourceService, ResourceServiceToken} from "../../core/resource/resource.module";
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
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {UnitEnum, UnitEnumValue, UnitEnumValuesToken} from "./model/unit.enum";
import {RecipeCategoryEnum, RecipeCategoryEnumValue, RecipeCategoryEnumValuesToken} from "./model/recipe-category.enum";
import {FieldsetModule} from "primeng/fieldset";

function initRecipeCategoryEnumValues(resourceService: ResourceService): RecipeCategoryEnumValue[] {
  return Object.keys(RecipeCategoryEnum).map(key => ({ label: resourceService.resolve("ADD_RECIPE.FIELD.CATEGORY." + RecipeCategoryEnum[key]), value: RecipeCategoryEnum[key] }));
}
function initUnitEnumValues(resourceService: ResourceService): UnitEnumValue[] {
  return Object.keys(UnitEnum).map(key => ({ label: resourceService.resolve("ADD_RECIPE.FIELD.UNIT.TYPE." + UnitEnum[key]), value: UnitEnum[key] }));
}

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
    ConfirmDialogModule,
    FieldsetModule,
  ],
  providers: [
    ConfirmationService,
    RecipeService,
    {provide: RecipeActionFactoryToken, useClass: RecipeActionFactoryImpl},
    { provide: UnitEnumValuesToken, useFactory: initUnitEnumValues, deps: [ResourceServiceToken] },
    { provide: RecipeCategoryEnumValuesToken, useFactory: initRecipeCategoryEnumValues, deps: [ResourceServiceToken] },

  ],
  exports: [
    RecipeListComponent,
  ]
})
export class RecipeModule { }
