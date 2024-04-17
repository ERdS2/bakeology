import {InjectionToken} from "@angular/core";

export enum UnitEnum {
  G = "G",
  TK = "TK",
  KK = "KK",
  DB = "DB",
  CS = "CS",
}
export const UnitEnumValuesToken: InjectionToken<UnitEnumValue[]> = new InjectionToken<UnitEnumValue[]>("ingredient.unit.enum.values");
export interface UnitEnumValue {
  label: string;
  value: string;
}
