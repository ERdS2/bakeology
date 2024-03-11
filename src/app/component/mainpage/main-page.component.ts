import {Component, Inject} from "@angular/core";
import {MainPageActionFactory, MainPageActionFactoryToken} from "./action/main-page.action-factory";

@Component({
  template: `
    <div class="main-page-container">

      <header>
        <b-header
          class="main-header"
          (menuItemSelected)="onMenuItemSelected($event)"
          (onClickAddRecipeButton)="onClickAddRecipeButton()"
        ></b-header>
      </header>

      <main class="main-page-body">
        <router-outlet></router-outlet>
      </main>

    </div>
  `
})
export class MainPageComponent{
  protected _mainPageActionFactory: MainPageActionFactory;

  constructor(
    @Inject(MainPageActionFactoryToken)
    mainPageActionFactory: MainPageActionFactory,
    ) {
    this._mainPageActionFactory = mainPageActionFactory;
  }
  public onMenuItemSelected(value): void {
    const request = {
      recipeType: value
    }
    this._mainPageActionFactory.getRecipeList(request).subscribe()
  }

  onClickAddRecipeButton(){
   console.warn("onClickAddRecipeButton")
  }

}
