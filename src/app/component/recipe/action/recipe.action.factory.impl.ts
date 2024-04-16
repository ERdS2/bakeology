import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {RecipeService} from "../../../../../mock/backend-api/services/recipe.service";
import {Observable, Subscriber} from "rxjs";
import {
  RECEIVE_NEW_RECIPE_SAVE,
  RECEIVE_RECIPE_ADD_FAVORITE,
  RECEIVE_RECIPE_DELETE, RECEIVE_RECIPE_LIST, RECIPE_FORM_CHANGE, RecipeActionFactory, REQUEST_NEW_RECIPE_SAVE,
  REQUEST_RECIPE_ADD_FAVORITE,
  REQUEST_RECIPE_DELETE, REQUEST_RECIPE_LIST,
} from "./recipe.action-factory";
import {Recipe} from "../../../../../mock/backend-api/model/recipe.model";
import {CoreAction} from "../../../core/state/model/core.action.model";
import {NewRecipeModel} from "../../../../../mock/backend-api/model/new-recipe.model";
import {GetRecipeListRequest} from "../../../../../mock/backend-api/model/getRecipeListRequest";
import {GetRecipeListResponse} from "../../../../../mock/backend-api/model/getRecipeListResponse";

@Injectable()
export class RecipeActionFactoryImpl implements RecipeActionFactory {
  protected _ngrxStore: Store<any>;
  protected _recipeService: RecipeService;

  constructor(
    ngrxStore: Store<any>,
    recipeService: RecipeService
  ) {
    this._ngrxStore = ngrxStore;
    this._recipeService = recipeService;
  }

  // CHANGE FORM

  public changeRecipeForm(request: NewRecipeModel): void {
    this._ngrxStore.dispatch(this.getChangeRecipeFormAction(request));
  }
  protected getChangeRecipeFormAction(request: NewRecipeModel): CoreAction<NewRecipeModel> {
    return {
      type: RECIPE_FORM_CHANGE,
      payload: request
    };
  }

  // SAVE
  public saveNewRecipe(newRecipe: NewRecipeModel): Observable<Recipe> {

    return new Observable<any>((subscriber: Subscriber<any>) => {

      this.requestSaveRecipe(newRecipe);

      this._recipeService.saveNewRecipe(newRecipe).subscribe(
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

  protected requestSaveRecipe(newRecipe: NewRecipeModel): void {
    this._ngrxStore.dispatch(this.saveRequestRecipeAction(newRecipe));
  }

  protected saveRequestRecipeAction(newRecipe: NewRecipeModel): CoreAction<Object> {
    return {
      payload: newRecipe,
      type: REQUEST_NEW_RECIPE_SAVE,
    };
  }

  protected receiveSaveRecipe(recipe: NewRecipeModel): void {
    this._ngrxStore.dispatch(this.saveReceiveRecipeAction(recipe));
  }

  protected saveReceiveRecipeAction(recipe: NewRecipeModel): CoreAction<Object> {
    return {
      type: RECEIVE_NEW_RECIPE_SAVE,
      payload: recipe
    };
  };

  // DELETE
  public deleteRecipe(recipe: Recipe): Observable<any> {

    return new Observable<any>((subscriber: Subscriber<any>) => {

      this.requestDeleteRecipe(recipe);

      this._recipeService.deleteRecipe(recipe).subscribe(
        () => {
          this.receiveDeleteRecipe(recipe);
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

  protected requestDeleteRecipe(recipe: Recipe): void {
    this._ngrxStore.dispatch(this.deleteRequestRecipeAction(recipe));
  }

  protected deleteRequestRecipeAction(recipe: Recipe): CoreAction<Object> {
    return {
      type: REQUEST_RECIPE_DELETE,
      payload: recipe,
    };
  }

  protected receiveDeleteRecipe(recipe: Recipe): void {
    this._ngrxStore.dispatch(this.deleteReceiveRecipeAction(recipe));
  }

  protected deleteReceiveRecipeAction(recipe: Recipe): CoreAction<Object> {
    return {
      type: RECEIVE_RECIPE_DELETE,
      payload: recipe
    };
  };

  // FAVORITE
  public addRecipeToFavorite(recipe: Recipe): Observable<any> {

    return new Observable<any>((subscriber: Subscriber<any>) => {

      this.requestAddRecipeToFavorite(recipe);

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

  protected requestAddRecipeToFavorite(recipe: Recipe): void {
    this._ngrxStore.dispatch(this.requestAddRecipeToFavoriteAction(recipe));
  }

  protected requestAddRecipeToFavoriteAction(recipe: Recipe): CoreAction<Object> {
    return {
      payload: recipe,
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

  // Get recipe list

  public getRecipeList(request: GetRecipeListRequest): Observable<GetRecipeListResponse> {
    return new Observable<GetRecipeListResponse>((subscriber: Subscriber<GetRecipeListResponse>) => {

      this.requestGetRecipeList(request);

      this._recipeService.getRecipeList(request).subscribe(
        (response: GetRecipeListResponse) => {
          this.receiveRecipeList(response);
          subscriber.next(response);
          subscriber.complete();
        },
        error => {
          subscriber.error(error);
        });
      return function unsubscribe() {
      };
    });
  }
  requestGetRecipeList(request) {
    this._ngrxStore.dispatch(this.requestGetRecipeListAction(request));
  }

  requestGetRecipeListAction(request) {
    return {
      type: REQUEST_RECIPE_LIST,
      payload: request
    };
  }

  public receiveRecipeList(response: GetRecipeListResponse): void {
    this._ngrxStore.dispatch(this.receiveRecipeListAction(response));
  }

  protected receiveRecipeListAction(response: GetRecipeListResponse): CoreAction<GetRecipeListResponse> {
    return {
      type: RECEIVE_RECIPE_LIST,
      payload: response
    };
  }
}
