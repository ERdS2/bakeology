import {Component, Inject, OnDestroy} from "@angular/core";
import {Recipe} from "../../../../../mock/backend-api/model/recipe.model";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {CommonUtils} from "../../../core/utils/common.utils";
import {RecipeActionFactory, RecipeActionFactoryToken} from "../action/recipe.action-factory";
import {RecipeState, selectRecipeListState} from "../model/recipe.state.model";

@Component({
  selector: "b-recipe-list",
  template: `
    <div class="b-recipe-list-container" >
        <b-recipe-card
          *ngFor="let recipe of recipeList"
          class="b-recipe-card"
          [recipe]="recipe"
          (addFavoriteEvent)="addRecipeToFavorite($event)"
          (deleteRecipeEvent)="deleteRecipe($event)">
        </b-recipe-card>
    </div>
  `
})
export class RecipeListComponent implements  OnDestroy{
  protected _recipeList: Array<Recipe> = [];
  protected _recipeActionFactory: RecipeActionFactory;
  protected _stateSubscription: Subscription;

  constructor(
    ngrxStore: Store<any>,
    @Inject(RecipeActionFactoryToken)
    recipeListActionFactory: RecipeActionFactory,
  ) {
    this._recipeActionFactory = recipeListActionFactory;
    this._stateSubscription = ngrxStore.select(selectRecipeListState).subscribe((state: RecipeState) => {
      if (state) {
        this._recipeList = state.recipeList;
      }
    });
  }

  public get recipeList(): Array<Recipe> {
    return this._recipeList;
  }

  addRecipeToFavorite(recipe: Recipe) {
    let newRecipe: Recipe = CommonUtils.clone(this._recipeList).find((item: Recipe) => item.id === recipe.id);
    newRecipe.favorite = !newRecipe.favorite;
    this._recipeActionFactory.addRecipeToFavorite(newRecipe).subscribe();
  }

  deleteRecipe(recipe: Recipe) {
    this._recipeActionFactory.deleteRecipe(recipe).subscribe();
  }

  ngOnDestroy(): void {
    CommonUtils.unsubscribeAll(this._stateSubscription);
  }
}
