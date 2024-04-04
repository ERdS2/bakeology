import {Injectable} from "@angular/core";
import {
  MainPageActionFactory,
  RECEIVE_RECIPE_LIST,
  REQUEST_RECIPE_LIST,
} from "./main-page.action-factory";
import {Store} from "@ngrx/store";
import {GetRecipeListRequest} from "../../../../../mock/backend-api/model/getRecipeListRequest";
import {GetRecipeListResponse} from "../../../../../mock/backend-api/model/getRecipeListResponse";
import {Observable, Subscriber} from "rxjs";
import {CoreAction} from "../../../core/state/model/core.action.model";
import {RecipeService} from "../../../../../mock/backend-api/services/recipe.service";

@Injectable()
export class MainPageActionFactoryImpl implements MainPageActionFactory {

  protected _ngrxStore: Store<any>;
  protected _recipeService: RecipeService;
  constructor(
    ngrxStore: Store<any>,
    recipeService: RecipeService,
  ) {
    this._ngrxStore = ngrxStore;
    this._recipeService = recipeService;
  }

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
