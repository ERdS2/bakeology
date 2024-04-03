import {Action} from "@ngrx/store";
export const FORM_DEBOUNCE_TIME: number = 200;
export interface CoreAction<T> extends Action {
  type: string;
  payload?: T;
}
