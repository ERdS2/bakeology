import {Component, Inject} from "@angular/core";
import {RecipeActionFactory, RecipeActionFactoryToken} from "../recipe/action/recipe.action-factory";

@Component({
  template: `
    <div class="main-page-container">

      <header>
        <b-header
          class="main-header"
        ></b-header>
      </header>

      <main class="main-page-body">
        <router-outlet></router-outlet>
      </main>

    </div>
  `
})
export class MainPageComponent{
  protected _recipeActionFactory: RecipeActionFactory;

  constructor(
    @Inject(RecipeActionFactoryToken)
    recipeActionFactory: RecipeActionFactory,
    ) {
    this._recipeActionFactory = recipeActionFactory;
  }

}
