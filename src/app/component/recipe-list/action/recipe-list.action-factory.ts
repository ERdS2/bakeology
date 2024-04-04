import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";
import {Recipe} from "../../../../../mock/backend-api/model/recipe.model";

export const REQUEST_RECIPE_DELETE: string = "REQUEST_RECIPE_DELETE";
export const RECEIVE_RECIPE_DELETE: string = "RECEIVE_RECIPE_DELETE";
export const REQUEST_RECIPE_ADD_FAVORITE: string = "REQUEST_RECIPE_ADD_FAVORITE";
export const RECEIVE_RECIPE_ADD_FAVORITE: string = "RECEIVE_RECIPE_ADD_FAVORITE";

export const AddRecipeListActionFactoryToken: InjectionToken<AddRecipeListActionFactory> = new InjectionToken<AddRecipeListActionFactory>("recipe.list.action.factory");

export interface AddRecipeListActionFactory {
  deleteRecipe(recipe: Recipe): Observable<any>;
  addRecipeToFavorite(recipe: Recipe): Observable<any>;
}
