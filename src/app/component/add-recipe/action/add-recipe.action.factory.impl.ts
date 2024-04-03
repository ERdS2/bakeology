import {AddRecipeActionFactory, RECEIVE_RECIPE_SAVE, REQUEST_RECIPE_SAVE} from "./add-recipe.action.factory";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {CoreAction} from "../../../core/state/model/core.action.model";
import {AddRecipe} from "../model/add.recipe";
import {AddRecipeService} from "../../../../../mock/backend-api/services/add-recipe.service";
import {Observable, Subscriber} from "rxjs";

@Injectable()
export class AddRecipeActionFactoryImpl implements AddRecipeActionFactory {
  protected _ngrxStore: Store<any>;
  protected _addRecipeService: AddRecipeService;

  constructor(
    ngrxStore: Store<any>,
    addRecipeService: AddRecipeService
  ) {
    this._ngrxStore = ngrxStore;
    this._addRecipeService = addRecipeService
  }

  // SAVE
  public saveNewRecipe(newRecipe: AddRecipe): Observable<any> {

    console.warn("itt még jó")
      console.warn(newRecipe)
    return new Observable<any>((subscriber: Subscriber<any>) => {
    console.warn("itt már nem")

      this.requestSaveRecipe();

      this._addRecipeService.saveNewRecipe(newRecipe).subscribe(
        () => {
          console.warn("banana")
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

  protected receiveSaveRecipe(recipe: AddRecipe): void {
    this._ngrxStore.dispatch(this.saveRecieveRecipeAction(recipe));
  }

  protected saveRecieveRecipeAction(recipe: AddRecipe): CoreAction<Object> {
    return {
      type: RECEIVE_RECIPE_SAVE,
      payload: recipe
    };
  };
}
