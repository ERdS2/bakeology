import {Recipe} from "./recipe.model";

export interface GetRecipeListResponse {
  talalatokSzama?: number;
  result?: Array<Recipe>;
}
