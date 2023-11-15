import {Component, OnDestroy, OnInit} from "@angular/core";


@Component({
  template: `
          <div class="main-page-container">

              <header class="main-header">
                  <b-header></b-header>
              </header>

              <main class="main-content-container" *ngFor="let recipe of recipeList"  >
                   <b-recipe-card [recipe]="recipe"></b-recipe-card>
              </main>

          </div>
        `
})
export class MainPageComponent implements OnInit, OnDestroy {

  public recipeList= [
    {
    id: 1,
    title: "Csoki mousse",
    type: "mousse",
      ingredients: {
        tej: 100,
        tojas: 1,
        cukor: 100,
        csoki: 2000,
        hab: 150
    }
    },
    {
    id: 2,
    title: "Csoki mousse",
    type: "mousse",
      ingredients: {
        tej: 100,
        tojas: 1,
        cukor: 100,
        csoki: 2000,
        hab: 150
    }
    },
    {
    id: 3,
    title: "Csoki mousse",
    type: "mousse",
      ingredients: {
        tej: 100,
        tojas: 1,
        cukor: 100,
        csoki: 2000,
        hab: 150
    }
    },
    {
    id: 4,
    title: "Csoki mousse",
    type: "mousse",
      ingredients: {
        tej: 100,
        tojas: 1,
        cukor: 100,
        csoki: 2000,
        hab: 150
    }
    }
  ]

  constructor() {

  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
  }
}
