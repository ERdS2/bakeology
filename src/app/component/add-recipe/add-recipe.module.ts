import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRecipeComponent } from './add-recipe.component';
import {ResourceModule} from "../../core/resource/resource.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputNumberModule} from "primeng/inputnumber";
import {AddRecipeService} from "../../../../mock/backend-api/services/add-recipe.service";
import {AddRecipeActionFactoryToken} from "./action/add-recipe.action.factory";
import {AddRecipeActionFactoryImpl} from "./action/add-recipe.action.factory.impl";
@NgModule({
  declarations: [
    AddRecipeComponent
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
    InputNumberModule
  ],
  providers: [
    AddRecipeService,
    {provide: AddRecipeActionFactoryToken, useClass: AddRecipeActionFactoryImpl}
  ]
})
export class AddRecipeModule { }
