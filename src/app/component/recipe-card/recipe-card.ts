import {Component, Input} from "@angular/core";

@Component({
  selector: "b-recipe-card",
  template: `
            <ng-container>
                <div class="recipe-card">
                  <div class="recipe-card-title-button-container">
                    <h2 class="recipe-card-title">{{recipe.title}}</h2>
                      <img class="recipe-card-button-img"
                           [id]="'recipe-card-img'"
                           [src]="''"/>
                  </div>

                  <ul class="recipe-card-ingredient-wrapper" *ngFor="let item of ingredients | keyvalue">
                     <li class="recipe-ingredient-amount"> {{item.value | json }} </li>
                     <li class="recipe-ingredient-name"> {{ item.key }} </li>
                  </ul>
                </div>
            </ng-container>
    `
})
export class RecipeCardComponent {

  public _recipe: any;

  @Input()
  public set recipe(recipe:any) {
    this._recipe = recipe;
  }

  constructor() {

  }
  public get recipe() {
    return this._recipe;
  }
  public get ingredients() {
    console.warn(this._recipe.ingredients)
    return this._recipe.ingredients;
  }
}
