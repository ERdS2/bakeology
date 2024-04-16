import {RecipeCategoryEnum} from "../../../src/app/component/recipe/model/recipe-category.enum";
import {UnitEnum} from "../../../src/app/component/recipe/model/unit.enum";

export interface AddNewRecipeRequest {
  title?: string,
  bakeParam?: BakeParam,
  ingredients?: Array<Ingredient>,
  category?: RecipeCategoryEnum
  favorite?: boolean
}
export interface BakeParam {
  time?: {
    hour?: number,
    minute?: number
  },
  temperature?: number,
}

export interface Ingredient {
  name?: string,
  amount?: number,
  unit?: UnitEnum,
}
