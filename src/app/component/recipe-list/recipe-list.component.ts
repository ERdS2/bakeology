import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {Recipe} from "../../../../mock/backend-api/model/recipe.model";
import {Store} from "@ngrx/store";
import {RecipeListState, selectRecipeListState} from "../mainpage/model/recipeList.state.model";
import {Subscription} from "rxjs";
import {CommonUtils} from "../../core/utils/common.utils";
import {MainPageActionFactory, MainPageActionFactoryToken} from "../mainpage/action/main-page.action-factory";

@Component({
  selector: "b-recipe-list",
  template: `
    <div class="recipe-list-page-container" *ngFor="let recipe of recipeList">
        <b-recipe-card [recipe]="recipe"></b-recipe-card>
    </div>
  `
})
export class RecipeListComponent implements OnInit, OnDestroy{
  protected _recipeList: Array<Recipe> = [];
  protected _mainPageActionFactory: MainPageActionFactory;

  protected _stateSubscription: Subscription;

  constructor(
    ngrxStore: Store<any>,
  @Inject(MainPageActionFactoryToken)
  mainPageActionFactory: MainPageActionFactory,
  ) {
    this._mainPageActionFactory = mainPageActionFactory;
    this._stateSubscription = ngrxStore.select(selectRecipeListState).subscribe((state: RecipeListState) => {
      if (state) {
        this._recipeList = [...state.recipeList];
      }
    });
  }
  ngOnInit(): void {
    // const request = {
    //   recipeType: value
    // }
    // this._mainPageActionFactory.getRecipeList(request).subscribe()
  }

  public get recipeList(): Array<Recipe> {
    return this._recipeList;
  }
  ngOnDestroy(): void {
    CommonUtils.unsubscribeAll(this._stateSubscription);
  }

}
