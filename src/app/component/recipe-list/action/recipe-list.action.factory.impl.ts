import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {RecipeService} from "../../../../../mock/backend-api/services/recipe.service";
import {Observable, Subscriber} from "rxjs";
import {
  AddRecipeListActionFactory, RECEIVE_RECIPE_ADD_FAVORITE,
  RECEIVE_RECIPE_DELETE,
  REQUEST_RECIPE_ADD_FAVORITE,
  REQUEST_RECIPE_DELETE
} from "./recipe-list.action-factory";
import {Recipe} from "../../../../../mock/backend-api/model/recipe.model";
import {CoreAction} from "../../../core/state/model/core.action.model";

@Injectable()
export class AddRecipeListActionFactoryImpl implements AddRecipeListActionFactory {
  protected _ngrxStore: Store<any>;
  protected _recipeService: RecipeService;

  constructor(
    ngrxStore: Store<any>,
    recipeService: RecipeService
  ) {
    this._ngrxStore = ngrxStore;
    this._recipeService = recipeService;
  }

  // DELETE
  public deleteRecipe(recipe: Recipe): Observable<any> {

    return new Observable<any>((subscriber: Subscriber<any>) => {

      this.requestSaveRecipe();

      this._recipeService.deleteRecipe(recipe).subscribe(
        () => {
          this.receiveSaveRecipe(recipe);
          subscriber.next(recipe);
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
    this._ngrxStore.dispatch(this.deleteRequestRecipeListAction());
  }

  protected deleteRequestRecipeListAction(): CoreAction<string> {
    return {
      type: REQUEST_RECIPE_DELETE,
    };
  }

  protected receiveSaveRecipe(recipe: Recipe): void {
    this._ngrxStore.dispatch(this.deleteReceiveRecipeListAction(recipe));
  }

  protected deleteReceiveRecipeListAction(recipe: Recipe): CoreAction<Object> {
    return {
      type: RECEIVE_RECIPE_DELETE,
      payload: recipe
    };
  };

  // FAVORITE
  public addRecipeToFavorite(recipe: Recipe): Observable<any> {

    return new Observable<any>((subscriber: Subscriber<any>) => {

      this.requestAddRecipeToFavorite();

      this._recipeService.addRecipeToFavorite(recipe).subscribe(
        () => {
          this.receiveAddRecipeToFavorite(recipe);
          subscriber.next(recipe);
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

  protected requestAddRecipeToFavorite(): void {
    this._ngrxStore.dispatch(this.requestAddRecipeToFavoriteAction());
  }

  protected requestAddRecipeToFavoriteAction(): CoreAction<string> {
    return {
      type: REQUEST_RECIPE_ADD_FAVORITE,
    };
  }

  protected receiveAddRecipeToFavorite(recipe: Recipe): void {
    this._ngrxStore.dispatch(this.receiveAddRecipeToFavoriteAction(recipe));
  }

  protected receiveAddRecipeToFavoriteAction(recipe: Recipe): CoreAction<Object> {
    return {
      type: RECEIVE_RECIPE_ADD_FAVORITE,
      payload: recipe
    };
  };
}
