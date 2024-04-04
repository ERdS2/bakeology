import {UnitEnum} from "./unit.enum";
import {RecipeCategoryEnum} from "./recipe-category.enum";

export interface NewRecipe {
  title: string,
  bakeParam?: BakeParam,
  ingredients?: Array<Ingredient>,
  category: RecipeCategoryEnum
  favorite: boolean

}

export interface BakeParam {
  time?: {
    hour?: number,
    minute?: number
  },
  temperature?: number,
}

export interface Ingredient {
  name: string,
  amount: number,
  unit: UnitEnum,
}
