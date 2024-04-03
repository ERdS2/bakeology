import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";
import {AddRecipe} from "../model/add.recipe";

export const REQUEST_RECIPE_SAVE: string = "REQUEST_RECIPE_SAVE";
export const RECEIVE_RECIPE_SAVE: string = "RECEIVE_RECIPE_SAVE";

export const AddRecipeActionFactoryToken: InjectionToken<AddRecipeActionFactory> = new InjectionToken<AddRecipeActionFactory>("feature.todo.page.action.factory");

export interface AddRecipeActionFactory {
  saveNewRecipe(newRecipe: AddRecipe): Observable<any>;
}
