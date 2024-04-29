import {Component, Inject, OnDestroy} from "@angular/core";
import {Recipe} from "../../../../../mock/backend-api/model/recipe.model";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {CommonUtils} from "../../../core/utils/common.utils";
import {RecipeActionFactory, RecipeActionFactoryToken} from "../action/recipe.action-factory";
import {RecipeState, selectRecipeListState} from "../model/recipe.state.model";
import {ConfirmationService} from "primeng/api";
import {ResourceService, ResourceServiceToken} from "../../../core/resource/service/resource.service";
import {Router} from "@angular/router";
import {RECIPE_DETAILS_URL} from "../../../app.config";

@Component({
  selector: "b-recipe-list",
  template: `
    <div class="b-recipe-list-container">
      <p-confirmDialog class="delete-confirm-dialog"></p-confirmDialog>
      <b-recipe-card
          *ngFor="let recipe of recipeList"
          class="b-recipe-card"
          [recipe]="recipe"
          (openRecipeEvent)="openRecipe($event)">
        </b-recipe-card>
    </div>
  `
})
export class RecipeListComponent implements  OnDestroy{
  protected _router: Router;
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
    router: Router,
  ) {
    this._recipeActionFactory = recipeListActionFactory;
    this._resourceService = resourceService;
    this._router = router;

    this._stateSubscription = ngrxStore.select(selectRecipeListState).subscribe((state: RecipeState) => {
      if (state) {
        this._recipeList = state.recipeList;
      }
    });
  }

  public get recipeList(): Array<Recipe> {
    return this._recipeList;
  }


  openRecipe(recipe: Recipe): void{
    this._recipeActionFactory.openRecipe(recipe);
    CommonUtils.navigatePageOrUrl(this._router, RECIPE_DETAILS_URL)
  }

  ngOnDestroy(): void {
    CommonUtils.unsubscribeAll(this._stateSubscription);
  }
}
