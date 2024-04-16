import {Recipe} from "../../../../../mock/backend-api/model/recipe.model";
import {createFeatureSelector} from "@ngrx/store";
import {NewRecipeModel} from "../../../../../mock/backend-api/model/new-recipe.model";

export const RECIPE_STATE_NAME: string = "recipe";

export interface RecipeState {
  recipeList?: Array<Recipe>;
  newRecipeFormRequest?: NewRecipeModel;

}
export const selectRecipeListState = createFeatureSelector<RecipeState>(RECIPE_STATE_NAME);
