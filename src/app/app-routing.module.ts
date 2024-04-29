import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./component/mainpage/main-page.component";
import {RecipeListComponent} from "./component/recipe/component/recipe-list.component";
import {AddRecipeComponent} from "./component/recipe/component/add-recipe.component";
import {RecipeListMousseResolve} from "./component/recipe/resolve/recipe-list-mousse.resolve";
import {RecipeListTuileResolve} from "./component/recipe/resolve/recipe-list-tuile.resolve";
import {RecipeListSableResolve} from "./component/recipe/resolve/recipe-list-sable.resolve";
import {RecipeModule} from "./component/recipe/recipe.module";
import {RecipeDetailsComponent} from "./component/recipe/component/recipe-details.component";

const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    children: [
      {
        path: "mousse",
        component: RecipeListComponent,
        resolve: {
          recipeList: RecipeListMousseResolve
        }
      },
      {
        path: "tuile",
        component: RecipeListComponent,
        resolve: {
          recipeList: RecipeListTuileResolve
        }
      },
      {
        path: "sable",
        component: RecipeListComponent,
        resolve: {
          recipeList: RecipeListSableResolve
        }
      },
      {
        path: "add-recipe",
        component: AddRecipeComponent,
      },
      {
        path: "recipe-details",
        component: RecipeDetailsComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RecipeModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    RecipeListTuileResolve,
    RecipeListSableResolve,
    RecipeListMousseResolve
  ]
})
export class AppRoutingModule { }
