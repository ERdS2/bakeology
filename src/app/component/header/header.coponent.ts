import {Component, EventEmitter, Output} from "@angular/core";
import {menuConfig} from "../../app.config";
import {MenuItem} from "../menu/model/menu.model";
@Component({
  selector: "b-header",
  template: `
        <div class="header-container">
            <div class="header-logo-container">
                <img class="header-container-cake-icon" id="cake-icon" [src]="'assets/icons/cake.svg'">
            </div>

            <div class="header-search-container">
              <div class="search-wrapper">
                <input class="search-field">
                <img id="search-icon" [src]="'assets/icons/search.svg'"/>
              </div>
            </div>

            <button (click)="onClickAddRecipeButton.emit()" routerLink="{{addRecipeMenuItem.path}}" class="add-recipe-button">{{"HEADER.ADD_RECIPE.BUTTON.TEXT" | resolve}}</button>

            <div class="header-menu-container">
                <header-menu
                  [menuItemList]="menuItemList"
                  (menuItemSelected)="menuItemSelected.emit($event)"
                ></header-menu>
            </div>

        </div>
    `
})
export class HeaderComponent {
  protected _menuItemList: Array<MenuItem>;
  protected _addRecipeMenuItem: MenuItem;

  @Output()
  menuItemSelected: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  @Output()
  onClickAddRecipeButton: EventEmitter<any> = new EventEmitter<any>();

  constructor()
  {
    this._menuItemList = menuConfig.menuItemList
    this._addRecipeMenuItem = menuConfig.addRecipeMenuItem
  }

  public get menuItemList(): Array<MenuItem> {
    return this._menuItemList;
  }
  public get addRecipeMenuItem(): MenuItem {
    return this._addRecipeMenuItem;
  }
}
