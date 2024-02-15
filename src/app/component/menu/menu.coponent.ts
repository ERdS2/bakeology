import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MenuItem} from "./model/menu.model";

@Component({
  selector: "header-menu",
  template: `
        <div class="menu-item-container">
          <ng-container *ngFor="let item of menuItemList; let index = index">
            <a class="menu-item" [id]="item.titleKey" (click)="onMenuItemSelected(item.titleKey)">
              {{item.titleKey}}
            </a>
          </ng-container>
        </div>
  `
})
export class MenuComponent {

  protected _menuItemList: Array<MenuItem>;

  @Input()
  public set menuItemList(menuItemList: Array<MenuItem>) {
    this._menuItemList = menuItemList;
  }

  @Output()
  menuItemSelected: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  constructor() {}

  onMenuItemSelected(titleKey): void {
      this.menuItemSelected.emit(titleKey);
  }

  public get menuItemList(): Array<MenuItem> {
    return this._menuItemList;
  }

}
