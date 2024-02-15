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

  @Output()
  menuItemSelected: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  constructor()
  {this._menuItemList = menuConfig.menuItemList}

  public get menuItemList(): Array<MenuItem> {
    return this._menuItemList;
  }
}
