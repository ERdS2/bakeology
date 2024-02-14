import {Injectable} from "@angular/core";
import {
  MainPageActionFactory,
  RECEIVE_RECIPE_LIST,
  REQUEST_RECIPE_LIST,
} from "./main-page.action-factory";
import {Store} from "@ngrx/store";
import {MainpageService} from "../../../../../mock/backend-api/services/mainpage.service";
import {GetRecipeListRequest} from "../../../../../mock/backend-api/model/getRecipeListRequest";
import {GetRecipeListResponse} from "../../../../../mock/backend-api/model/getRecipeListResponse";
import {Observable, Subscriber} from "rxjs";
import {CoreAction} from "../../../core/state/model/core.action.model";

@Injectable()
export class MainPageActionFactoryImp implements MainPageActionFactory {

  protected _ngrxStore: Store<any>;
  protected _mainPageService: MainpageService;
  constructor(
    ngrxStore: Store<any>,
    mainPageService: MainpageService,
  ) {
    this._ngrxStore = ngrxStore;
    this._mainPageService = mainPageService;
  }

  public getRecipeList(request: GetRecipeListRequest): Observable<GetRecipeListResponse> {
    return new Observable<GetRecipeListResponse>((subscriber: Subscriber<GetRecipeListResponse>) => {

      this.requestGetRecipeList(request);

      this._mainPageService.getRecipeList(request).subscribe(
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
    this._ngrxStore.dispatch(this.getRequestGetRecipeListAction(request));
  }

  getRequestGetRecipeListAction(request) {
    return {
      type: REQUEST_RECIPE_LIST,
      payload: request
    };
  }

  public receiveRecipeList(response: GetRecipeListResponse): void {
    this._ngrxStore.dispatch(this.getReceiveRecipeListAction(response));
  }

  protected getReceiveRecipeListAction(response: GetRecipeListResponse): CoreAction<GetRecipeListResponse> {
    return {
      type: RECEIVE_RECIPE_LIST,
      payload: response
    };
  }

  // public selectedRecipe(recipe: Recipe): void {
  //   this._ngrxStore.dispatch(this.getSelectedRecipeAction(recipe));
  // }
  //
  // protected getSelectedRecipeAction(recipe: Recipe): CoreAction<Recipe> {
  //   return {
  //     type: SELECTED_RECIPE_ITEM,
  //     payload: recipe
  //   };
  // }

  // public deleteRecipe(recipe: Recipe): Observable<any> {
    // return new Observable<any>((subscriber: Subscriber<any>) => {
    //
    //   this.requestDeleteRecipe(recipe);
    //
    //   let request: PutRecipeModifyStatusRequest = {
    //     data: [recipe]
    //   };
    //
    //   this._mainPageService.putRecipeModifyStatus(request).subscribe(
    //     (response: any) => {
    //       this.receiveDeleteRecipe(recipe.id);
    //       subscriber.next(response);
    //       subscriber.complete();
    //     },
    //     error => {
    //       subscriber.error(error);
    //     });
    //   return function unsubscribe() {
    //   };
    // });
  // }

  // public requestDeleteRecipe(recipe: Recipe): void {
  //   this._ngrxStore.dispatch(this.getRequestDeleteRecipeAction(recipe));
  // }
  //
  // protected getRequestDeleteRecipeAction(recipe: Recipe): CoreAction<Recipe> {
  //   return {
  //     type: REQUEST_DELETE_RECIPE,
  //     payload: recipe
  //   };
  // }
  //
  // public receiveDeleteRecipe(recipeId: number): void {
  //   this._ngrxStore.dispatch(this.getReceiveDeleteRecipeAction(recipeId));
  // }
  //
  // protected getReceiveDeleteRecipeAction(recipeId: number): CoreAction<number> {
  //   return {
  //     type: RECEIVE_DELETE_RECIPE,
  //     payload: recipeId
  //   };
  // }
}
