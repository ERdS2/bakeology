import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <h2>Banana</h2>
        <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
