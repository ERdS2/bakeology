import {Recipe} from "../../../../../mock/backend-api/model/recipe.model";
import {GetRecipeListRequest} from "../../../../../mock/backend-api/model/getRecipeListRequest";
import {createFeatureSelector} from "@ngrx/store";

export const RECIPE_LIST_STATE_NAME: string = "recipeList";

export interface RecipeListState {
  recipeListRequest?: GetRecipeListRequest;
  recipeList?: Array<Recipe>;
  selectedRecipe?: Recipe;

}
export const selectRecipeListState = createFeatureSelector<RecipeListState>(RECIPE_LIST_STATE_NAME);
