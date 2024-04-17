import {Component, Inject, OnDestroy} from "@angular/core";
import {Recipe} from "../../../../../mock/backend-api/model/recipe.model";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {CommonUtils} from "../../../core/utils/common.utils";
import {RecipeActionFactory, RecipeActionFactoryToken} from "../action/recipe.action-factory";
import {RecipeState, selectRecipeListState} from "../model/recipe.state.model";
import {ConfirmationService} from "primeng/api";
import {ResourceService, ResourceServiceToken} from "../../../core/resource/service/resource.service";

@Component({
  selector: "b-recipe-list",
  template: `
    <div class="b-recipe-list-container">
      <p-confirmDialog></p-confirmDialog>
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
  protected _resourceService: ResourceService;

  constructor(
    @Inject(ResourceServiceToken)
      resourceService: ResourceService,
    private confirmationService: ConfirmationService,
    ngrxStore: Store<any>,
    @Inject(RecipeActionFactoryToken)
    recipeListActionFactory: RecipeActionFactory,
  ) {
    this._recipeActionFactory = recipeListActionFactory;
    this._resourceService = resourceService;

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
    this.confirmationService.confirm({
      message: this._resourceService.resolve("RECIPE_CARD.DELETE.MESSAGE"),
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this._recipeActionFactory.deleteRecipe(recipe).subscribe();
        },
      reject: () => {
      }
    });
  }

  ngOnDestroy(): void {
    CommonUtils.unsubscribeAll(this._stateSubscription);
  }
}
