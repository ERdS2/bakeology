import {Component, Inject, OnDestroy} from "@angular/core";
import {ResourceService, ResourceServiceToken} from "../../../core/resource/service/resource.service";
import {Store} from "@ngrx/store";
import {RecipeActionFactory, RecipeActionFactoryToken} from "../action/recipe.action-factory";
import {RecipeState, selectRecipeListState} from "../model/recipe.state.model";
import {Recipe} from "../../../../../mock/backend-api/model/recipe.model";
import {Subscription} from "rxjs";
import {CommonUtils} from "../../../core/utils/common.utils";
import {ConfirmationService} from "primeng/api";
@Component({
  selector: "b-recipe-details",
  template: `
    <div *ngIf="recipe" class="recipe-details-container">
      <div class="recipe-card-title-button-container">
        <div class="recipe-card-title-details">
          <p class="recipe-card-title">{{recipe.title}}</p>
          <p *ngIf="recipe.bakeParam?.temperature"
             class="temperature-field">{{recipe.bakeParam.temperature}}{{"RECIPE_CARD.TEMPERATURE" | resolve}}</p>
          <div class="time-wrapper">
            <p *ngIf="recipe.bakeParam?.time.hour"
               class="time-field">{{recipe.bakeParam.time.hour}}{{"RECIPE_CARD.TIME_UNIT.HOUR" | resolve}}</p>
            <p *ngIf="recipe.bakeParam?.time.minute"
               class="time-field">{{recipe.bakeParam.time.minute}}{{"RECIPE_CARD.TIME_UNIT.MINUTE" | resolve}}</p>
          </div>
        </div>
        <div class="fav-delete-button-wrapper">
          <i class="pi pi-pencil modify-ingredient-icon"></i>
          <i [ngClass]="{'pi-heart': !recipe.favorite, 'pi-heart-fill': recipe.favorite}" class="pi add-favorite-icon" (click)="addRecipeToFavorite()"></i>
          <i class="pi pi-trash delete-ingredient-icon" (click)="deleteRecipe()"></i>
        </div>
      </div>

      <p *ngIf="recipe.subTitle" class="recipe-card-subtitle">({{recipe.subTitle}})</p>

      <div class="recipe-card-body-container">
        <div class="recipe-card-list-wrapper">
          <ul class="recipe-card-ingredient-wrapper" *ngFor="let item of recipe.ingredients">
            <div class="recipe-card-ingredient-list">
              <li class="recipe-ingredient-amount">{{item.amount}}</li>
              <li class="recipe-ingredient-unit">{{ item.unit }}</li>
              <li class="recipe-ingredient-name">{{ item.name }}</li>
            </div>
            <li class="recipe-ingredient-detail">{{ item.detail }}</li>
          </ul>
        </div>
      </div>
      <div class="recipe-note-wrapper">
        <p-editor class="recipe-note-editor" [(ngModel)]="recipe.note"></p-editor>
      </div>
    </div>
  `
})
export class RecipeDetailsComponent implements OnDestroy {
  protected _recipe: Recipe;
  protected _recipeList: Array<Recipe>;
  protected _recipeActionFactory: RecipeActionFactory;
  protected _stateSubscription: Subscription;
  protected _resourceService: ResourceService;

  constructor(
    @Inject(ResourceServiceToken)
      resourceService: ResourceService,
    ngrxStore: Store<any>,
    @Inject(RecipeActionFactoryToken)
      recipeListActionFactory: RecipeActionFactory,
    private confirmationService: ConfirmationService,
    ) {
    this._recipeActionFactory = recipeListActionFactory;
    this._resourceService = resourceService;

    this._stateSubscription = ngrxStore.select(selectRecipeListState).subscribe((state: RecipeState) => {
      if (state) {
        this._recipe = state.selectedRecipe;
        this._recipeList = state.recipeList;
      }
    });
  }
  addRecipeToFavorite(): void {
    let newRecipe: Recipe = CommonUtils.clone(this._recipeList).find((item: Recipe) => item.id === this._recipe.id);
    newRecipe.favorite = !newRecipe.favorite;
    this._recipeActionFactory.addRecipeToFavorite(newRecipe).subscribe();
  }

  deleteRecipe(): void {
    this.confirmationService.confirm({
      message: this._resourceService.resolve("RECIPE_CARD.DELETE.MESSAGE"),
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this._recipeActionFactory.deleteRecipe(this._recipe).subscribe();
      },
      reject: () => {
      }
    });
  }

  public get recipe(): Recipe {
    return this._recipe;
  }
  ngOnDestroy(): void {
    CommonUtils.unsubscribeAll(this._stateSubscription);
  }

}
