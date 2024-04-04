import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {Recipe} from "../../../../mock/backend-api/model/recipe.model";
import {Store} from "@ngrx/store";
import {RecipeListState, selectRecipeListState} from "../mainpage/model/recipeList.state.model";
import {Subscription} from "rxjs";
import {CommonUtils} from "../../core/utils/common.utils";

@Component({
  selector: "b-recipe-list",
  template: `
    <div class="b-recipe-list-container" >
        <b-recipe-card
          *ngFor="let recipe of recipeList"
          class="b-recipe-card"
          [recipe]="recipe"
          (addFavorite)="addRecipeToFavorite()"
          (deleteRecipe)="deleteRecipe()">
        </b-recipe-card>
    </div>
  `
})
export class RecipeListComponent implements OnInit, OnDestroy{
  protected _recipeList: Array<Recipe> = [];
  protected _recipeListActionFactory: RecipeListActionFactory;
  protected _stateSubscription: Subscription;

  constructor(
    ngrxStore: Store<any>,
    @Inject(RecipeListActionFactoryToken)
    recipeListActionFactory: RecipeListActionFactory,
  ) {
    this._recipeListActionFactory = recipeListActionFactory;
    this._stateSubscription = ngrxStore.select(selectRecipeListState).subscribe((state: RecipeListState) => {
      if (state) {
        this._recipeList = state.recipeList;
      }
    });
  }
  ngOnInit(): void {
  }

  public get recipeList(): Array<Recipe> {
    return this._recipeList;
  }

  addRecipeToFavorite() {

  }

  deleteRecipe() {

  }
  ngOnDestroy(): void {
    CommonUtils.unsubscribeAll(this._stateSubscription);
  }
}
