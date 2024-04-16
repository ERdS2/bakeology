import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MenuItem} from "./model/menu.model";

@Component({
  selector: "header-menu",
  template: `
        <div class="menu-item-container">
          <ng-container *ngFor="let item of menuItemList; let index = index">
            <a class="menu-item" [id]="item.titleKey" routerLink="{{item.path}}" (click)="onMenuItemSelected(item)">
              {{item.titleKey | resolve}}
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

  @Output()
  onClickAddRecipeButton: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  onMenuItemSelected(menuItem: MenuItem): void {
      this.menuItemSelected.emit(menuItem);
  }

  public get menuItemList(): Array<MenuItem> {
    return this._menuItemList;
  }

}
