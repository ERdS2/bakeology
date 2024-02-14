import {Component, Inject, Input} from "@angular/core";
import {MainPageActionFactory, MainPageActionFactoryToken} from "../mainpage/action/main-page.action-factory";
import {MenuItem} from "./menu.model";


@Component({
  selector: "header-menu",
  template: `
        <div class="menu-item-container">
          <ng-container *ngFor="let item of menuItemList; let index = index">
            <a class="menu-item" [id]="item.titleKey" (click)="onMenuItemClick(item.titleKey)">
              {{item.titleKey}}
            </a>
          </ng-container>
        </div>
  `
})
export class MenuComponent {

  protected _menuItemList: Array<MenuItem>;
  protected _mainPageActionFactory: MainPageActionFactory;
  @Input()
  public set menuItemList(menuItemList: Array<MenuItem>) {
    this._menuItemList = menuItemList;
  }

  constructor(
    @Inject(MainPageActionFactoryToken)
      mainPageActionFactory: MainPageActionFactory,
  ) {
    this._mainPageActionFactory = mainPageActionFactory;
  }

  public onMenuItemClick(titleKey): void {
    const request = {
      recipeType: titleKey
    }
    this._mainPageActionFactory.getRecipeList(request).subscribe()
  }
  public get menuItemList(): Array<MenuItem> {
    return this._menuItemList;
  }

}
