import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./component/mainpage/main-page.component";
import {RecipeListComponent} from "./component/recipe-list/recipe-list.component";
import {AddRecipeComponent} from "./component/add-recipe/add-recipe.component";

const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    children: [
      {
        path: "mousse",
        component: RecipeListComponent
      },
      {
        path: "tuile",
        component: RecipeListComponent
      },
      {
        path: "sable",
        component: RecipeListComponent
      },
      {
        path: "add-recipe",
        component: AddRecipeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
