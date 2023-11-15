import { Component } from "@angular/core";
@Component({
  selector: "b-header",
  template: `
        <div class="header-container">
            <div class="header-logo-container">

            </div>

            <div class="header-search-container">
              <div class="search-wrapper">
                <input class="search-field">
                <img id="search-icon" [src]="'assets/icons/search.svg'"/>
              </div>
            </div>

            <div class="header-menu-container">
                <b-menu></b-menu>
            </div>

        </div>
    `
})
export class HeaderComponent {

}
