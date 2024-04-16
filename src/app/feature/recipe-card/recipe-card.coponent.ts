import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Recipe} from "../../../../mock/backend-api/model/recipe.model";

@Component({
  selector: "" +
    "b-recipe-card",
  template: `
                <div class="recipe-card">
                  <div class="recipe-card-title-button-container">
                    <h2 class="recipe-card-title">{{recipe.title}}</h2>
                      <img class="recipe-card-button-img"
                           [id]="'recipe-card-img'"
                           [src]="''"/>
                    <p *ngIf="recipe.bakeParam?.temperature" class="temperature-field">{{recipe.bakeParam.temperature}}{{"RECIPE_CARD.TEMPERATURE" | resolve}}</p>
                    <div class="time-wrapper">
                      <p *ngIf="recipe.bakeParam?.time.hour" class="time-field">{{recipe.bakeParam.time.hour}}{{"RECIPE_CARD.TIME_UNIT.HOUR" | resolve}}</p>
                      <p *ngIf="recipe.bakeParam?.time.minute" class="time-field">{{recipe.bakeParam.time.minute}}{{"RECIPE_CARD.TIME_UNIT.MINUTE" | resolve}}</p>
                    </div>
                    <div class="fav-delete-button-wrapper">
                      <i [ngClass]="{'pi-heart': !recipe.favorite, 'pi-heart-fill': recipe.favorite}" class="pi add-favorite-icon" (click)="addRecipeToFavorite()"></i>
                      <i class="pi pi-trash delete-ingredient-icon" (click)="deleteRecipe()"></i>
                    </div>
                  </div>

                  <ul class="recipe-card-ingredient-wrapper" *ngFor="let item of ingredients">
                     <li class="recipe-ingredient-amount"> {{item.amount}} </li>
                     <li class="recipe-ingredient-unit"> {{ item.unit }} </li>
                     <li class="recipe-ingredient-name"> {{ item.name }} </li>
                  </ul>
                </div>
    `
})
export class RecipeCardComponent {

  public _recipe: any;

  @Output()
  addFavoriteEvent: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  @Output()
  deleteRecipeEvent: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  @Input()
  public set recipe(recipe:any) {
    this._recipe = recipe;
  }

  constructor() {
  }

  addRecipeToFavorite() {
    this.addFavoriteEvent.emit(this._recipe)
  }

  deleteRecipe() {
    this.deleteRecipeEvent.emit(this._recipe)
  }

  public get recipe() {
    return this._recipe;
  }
  public get ingredients() {
    return this._recipe.ingredients;
  }
}
