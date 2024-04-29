import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Recipe} from "../../../../mock/backend-api/model/recipe.model";

@Component({
  selector: "b-recipe-card",
  template: `
    <div class="recipe-card">

      <div class="recipe-card-title-button-container">
        <p class="recipe-card-title">{{recipe.title}}</p>
        <div class="recipe-card-title-details">
          <p *ngIf="recipe.bakeParam?.temperature"
             class="temperature-field">{{recipe.bakeParam.temperature}}{{"RECIPE_CARD.TEMPERATURE" | resolve}}</p>
          <div class="time-wrapper">
            <p *ngIf="recipe.bakeParam?.time.hour"
               class="time-field">{{recipe.bakeParam.time.hour}}{{"RECIPE_CARD.TIME_UNIT.HOUR" | resolve}}</p>
            <p *ngIf="recipe.bakeParam?.time.minute"
               class="time-field">{{recipe.bakeParam.time.minute}}{{"RECIPE_CARD.TIME_UNIT.MINUTE" | resolve}}</p>
          </div>
          <div class="fav-delete-button-wrapper">
            <i [ngClass]="{'pi-heart': !recipe.favorite, 'pi-heart-fill': recipe.favorite}" class="pi add-favorite-icon"></i>
            <i class="pi pi-pencil modify-ingredient-icon"></i>
          </div>
        </div>
      </div>

      <p *ngIf="recipe.subTitle" class="recipe-card-subtitle">({{recipe.subTitle}})</p>

      <div class="recipe-card-body-container">
        <div class="recipe-card-list-wrapper">
          <ul class="recipe-card-ingredient-wrapper" *ngFor="let item of topIngredients">
            <div class="recipe-card-ingredient-list">
              <li class="recipe-ingredient-amount">{{item.amount}}</li>
              <li class="recipe-ingredient-unit">{{ item.unit }}</li>
              <li class="recipe-ingredient-name">{{ item.name }}</li>
            </div>
            <li class="recipe-ingredient-detail">{{ item.detail }}</li>
          </ul>
        </div>
        <div class="open-recipe-button-wrapper">
          <i *ngIf="recipe.ingredients.length > 5" class="pi pi-arrow-right open-recipe-button" (click)="openRecipe()"></i>
        </div>
      </div>

    </div>
  `
})
export class RecipeCardComponent {

  public _recipe: any;

  @Output()
  openRecipeEvent: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  @Input()
  public set recipe(recipe:any) {
    this._recipe = recipe;
  }

  constructor() {
  }

  openRecipe() {
    this.openRecipeEvent.emit(this._recipe)
  }

  public get recipe() {
    return this._recipe;
  }
  public get topIngredients() {
    let topIngredients = []
    for(let i = 0;i < 5; i++){
      if(this._recipe.ingredients[i]){topIngredients.push(this._recipe.ingredients[i])}
    }
    return topIngredients;
  }

}
