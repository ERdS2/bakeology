import {InjectionToken} from "@angular/core";

export enum RecipeCategoryEnum {
  SABLE = "SABLE",
  MOUSSE = "MOUSSE",
  TUILE = "TUILE",
  SPONGECAKE = "SPONGECAKE",
  INSERT = "INSERT",
}
export const RecipeCategoryEnumValuesToken: InjectionToken<RecipeCategoryEnumValue[]> = new InjectionToken<RecipeCategoryEnumValue[]>("recipe.category.enum.values");
export interface RecipeCategoryEnumValue {
  label: string;
  value: string;
}
