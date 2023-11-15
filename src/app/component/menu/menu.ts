import {Component, OnDestroy, OnInit} from "@angular/core";


@Component({
  selector: "b-menu",
  template: `
        <div class="menu-item-container">
          <ng-container *ngFor="let item of menuItemList">
            <b-menu-item [menuItem]="item"></b-menu-item>
          </ng-container>
        </div>
  `
})
export class MenuComponent implements OnInit, OnDestroy {

  public menuItemList= [
    {
      titleKey: "Mousse",
      id: 1
    },
    {
      titleKey: "Sable",
      id: 2
    },
    {
      titleKey: "Tuile",
      id: 3
    }
    ];
  constructor() {

  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
  }

}
