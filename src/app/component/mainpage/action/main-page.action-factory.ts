import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import {GetRecipeListRequest} from "../../../../../mock/backend-api/model/getRecipeListRequest";
import {GetRecipeListResponse} from "../../../../../mock/backend-api/model/getRecipeListResponse";

export const REQUEST_RECIPE_LIST: string = "REQUEST_RECIPE_LIST";
export const RECEIVE_RECIPE_LIST: string = "RECEIVE_RECIPE_LIST";
export const SELECTED_RECIPE_ITEM: string = "SELECTED_RECIPE_ITEM";
export const REQUEST_DELETE_RECIPE: string = "REQUEST_DELETE_RECIPE";
export const RECEIVE_DELETE_RECIPE: string = "RECEIVE_DELETE_RECIPE";

export const MainPageActionFactoryToken: InjectionToken<MainPageActionFactory> = new InjectionToken<MainPageActionFactory>("main.page.action.factory");

export interface MainPageActionFactory {

  getRecipeList(request: GetRecipeListRequest): Observable<GetRecipeListResponse>;

  // selectedRecipe(recipe: Recipe): void;
  //
  // deleteRecipe(recipe: Recipe): Observable<any>;

}
