import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: "b-menu-item",
  template: `
            <ng-container>
              <a class="menu-item" [id]="menuItem.id" (click)="onMenuItemClick()">
                {{menuItem.titleKey}}
              </a>
            </ng-container>
    `
})
export class MenuItemComponent {

  protected _menuItem: any;

  @Input()
  public set menuItem(menuItem:any) {
    this._menuItem = menuItem;
  }

  constructor(
    protected router: Router,
  ) {

  }

  public onMenuItemClick(): void {
    console.warn("click")
  }

  public get menuItem() {
    return this._menuItem;
  }

}
