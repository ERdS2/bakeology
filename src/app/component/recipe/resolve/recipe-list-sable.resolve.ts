import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Inject, Injectable} from "@angular/core";
import {RecipeActionFactory, RecipeActionFactoryToken} from "../action/recipe.action-factory";
import {Observable} from "rxjs";
import {GetRecipeListResponse} from "../../../../../mock/backend-api/model/getRecipeListResponse";

@Injectable()
export class RecipeListSableResolve implements Resolve<GetRecipeListResponse> {

  protected _recipeActionFactory: RecipeActionFactory;

  constructor(@Inject(RecipeActionFactoryToken)
                recipeActionFactory: RecipeActionFactory) {
    this._recipeActionFactory = recipeActionFactory;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetRecipeListResponse> {
    const request = {
      category: 'sable'
    }
    return this._recipeActionFactory.getRecipeList(request);
  }
}
