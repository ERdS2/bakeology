import {Recipe} from "../../../../../mock/backend-api/model/recipe.model";
import {createFeatureSelector} from "@ngrx/store";

export const ADD_RECIPE_STATE_NAME: string = "addRecipe";

export interface AddRecipeState {
  recipe: Recipe

}
export const selectAddRecipeState = createFeatureSelector<AddRecipeState>(ADD_RECIPE_STATE_NAME);
