import {AddRecipeActionFactory, RECEIVE_RECIPE_SAVE, REQUEST_RECIPE_SAVE} from "./add-recipe.action.factory";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {CoreAction} from "../../../core/state/model/core.action.model";
import {NewRecipe} from "../model/new-recipe";
import {RecipeService} from "../../../../../mock/backend-api/services/recipe.service";
import {Observable, Subscriber} from "rxjs";

@Injectable()
export class AddRecipeActionFactoryImpl implements AddRecipeActionFactory {
  protected _ngrxStore: Store<any>;
  protected _addRecipeService: RecipeService;

  constructor(
    ngrxStore: Store<any>,
    addRecipeService: RecipeService
  ) {
    this._ngrxStore = ngrxStore;
    this._addRecipeService = addRecipeService
  }

  // SAVE
  public saveNewRecipe(newRecipe: NewRecipe): Observable<any> {

    return new Observable<any>((subscriber: Subscriber<any>) => {

      this.requestSaveRecipe();

      this._addRecipeService.saveNewRecipe(newRecipe).subscribe(
        () => {
          this.receiveSaveRecipe(newRecipe);
          subscriber.next(newRecipe);
          subscriber.complete();
        },
        error => {
          subscriber.error(error);
        }
      );

      return function unsubscribe() {

      };
    });
  };

  protected requestSaveRecipe(): void {
    this._ngrxStore.dispatch(this.saveRequestRecipeAction());
  }

  protected saveRequestRecipeAction(): CoreAction<string> {
    return {
      type: REQUEST_RECIPE_SAVE,
    };
  }

  protected receiveSaveRecipe(recipe: NewRecipe): void {
    this._ngrxStore.dispatch(this.saveReceiveRecipeAction(recipe));
  }

  protected saveReceiveRecipeAction(recipe: NewRecipe): CoreAction<Object> {
    return {
      type: RECEIVE_RECIPE_SAVE,
      payload: recipe
    };
  };
}
