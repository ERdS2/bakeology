import {Component, Inject, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
import {Recipe} from "../../../../mock/backend-api/model/recipe.model";
import {CommonUtils} from "../../core/utils/common.utils";
import {MainPageActionFactory, MainPageActionFactoryToken} from "./action/main-page.action-factory";
import {Store} from "@ngrx/store";
import {RecipeListState, selectRecipeListState} from "./model/recipeList.state.model";


@Component({
  template: `
    <div class="main-page-container">

      <header class="main-header">
        <b-header
          (menuItemSelected)="onMenuItemSelected($event)"
        ></b-header>
      </header>

      <main class="main-content-container" *ngFor="let recipe of recipeList">
        <b-recipe-card [recipe]="recipe"></b-recipe-card>
      </main>

    </div>
  `
})
export class MainPageComponent implements OnDestroy {
  protected _stateSubscription: Subscription;
  protected _mainPageActionFactory: MainPageActionFactory;
  protected _recipeList: Array<Recipe> = [];

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
  public onMenuItemSelected(value): void {
    const request = {
      recipeType: value
    }
    this._mainPageActionFactory.getRecipeList(request).subscribe()
  }
  public get recipeList(): Array<Recipe> {
    return this._recipeList;
  }
  ngOnDestroy(): void {
    CommonUtils.unsubscribeAll(this._stateSubscription);
  }
}
