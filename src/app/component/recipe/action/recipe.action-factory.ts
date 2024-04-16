import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";
import {Recipe} from "../../../../../mock/backend-api/model/recipe.model";
import {NewRecipeModel} from "../../../../../mock/backend-api/model/new-recipe.model";
import {GetRecipeListRequest} from "../../../../../mock/backend-api/model/getRecipeListRequest";
import {GetRecipeListResponse} from "../../../../../mock/backend-api/model/getRecipeListResponse";
import {AddNewRecipeRequest} from "../../../../../mock/backend-api/model/addNewRecipeRequest";

export const REQUEST_RECIPE_DELETE: string = "REQUEST_RECIPE_DELETE";
export const RECEIVE_RECIPE_DELETE: string = "RECEIVE_RECIPE_DELETE";
export const REQUEST_RECIPE_ADD_FAVORITE: string = "REQUEST_RECIPE_ADD_FAVORITE";
export const RECEIVE_RECIPE_ADD_FAVORITE: string = "RECEIVE_RECIPE_ADD_FAVORITE";
export const REQUEST_NEW_RECIPE_SAVE: string = "REQUEST_NEW_RECIPE_SAVE";
export const RECEIVE_NEW_RECIPE_SAVE: string = "RECEIVE_NEW_RECIPE_SAVE";
export const REQUEST_RECIPE_LIST: string = "REQUEST_RECIPE_LIST";
export const RECEIVE_RECIPE_LIST: string = "RECEIVE_RECIPE_LIST";
export const RECIPE_FORM_CHANGE: string = "RECIPE_FORM_CHANGE";


export const RecipeActionFactoryToken: InjectionToken<RecipeActionFactory> = new InjectionToken<RecipeActionFactory>("recipe.action.factory");

export interface RecipeActionFactory {
  deleteRecipe(recipe: Recipe): Observable<any>;
  addRecipeToFavorite(recipe: Recipe): Observable<any>;
  saveNewRecipe(newRecipe: AddNewRecipeRequest): Observable<Recipe>;
  getRecipeList(request: GetRecipeListRequest): Observable<GetRecipeListResponse>;
  changeRecipeForm(request: NewRecipeModel): void;

}
