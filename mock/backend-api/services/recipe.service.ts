import {Inject, Injectable, Optional} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders, HttpParameterCodec, HttpResponse} from "@angular/common/http";
import { Configuration } from '../configuration';
import {BASE_PATH} from "../variables";
import {Observable} from "rxjs";
import {NewRecipe} from "../../../src/app/component/add-recipe/model/new-recipe";
import {EmptyResponse} from "../../../src/app/component/add-recipe/model/empty-response.interface";
import {GetRecipeListRequest} from "../model/getRecipeListRequest";
import {GetRecipeListResponse} from "../model/getRecipeListResponse";
import {Recipe} from "../model/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  protected basePath = 'http://localhost:3000';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  public encoder: HttpParameterCodec;

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath;
      }
      this.configuration.basePath = basePath;
    }
  }

  public getRecipeList(getRecipeListRequest: GetRecipeListRequest, observe?: 'body', reportProgress?: boolean): Observable<GetRecipeListResponse>;
  public getRecipeList(getRecipeListRequest: GetRecipeListRequest, observe?: 'response'): Observable<HttpResponse<GetRecipeListResponse>>;
  public getRecipeList(getRecipeListRequest: GetRecipeListRequest, observe?: 'events'): Observable<HttpEvent<GetRecipeListResponse>>;
  public getRecipeList(getRecipeListRequest: GetRecipeListRequest, observe: any = 'body'): Observable<any> {
    if (getRecipeListRequest === null || getRecipeListRequest === undefined)  {
      throw new Error('Required parameter getRecipeListRequest was null or undefined when calling getRecipeList.');
    }

    let headers = this.defaultHeaders;

    return this.httpClient.get<any>(`${this.configuration.basePath}/${getRecipeListRequest.category}`,
      {
        headers: headers,
        observe: observe,
      }
    );
  }


  public saveNewRecipe(saveNewRecipeRequest: NewRecipe, observe?: 'body', reportProgress?: boolean): Observable<EmptyResponse>;
  public saveNewRecipe(saveNewRecipeRequest: NewRecipe, observe?: 'response'): Observable<HttpResponse<EmptyResponse>>;
  public saveNewRecipe(saveNewRecipeRequest: NewRecipe, observe?: 'events'): Observable<HttpEvent<EmptyResponse>>;
  public saveNewRecipe(saveNewRecipeRequest: NewRecipe, observe: any = 'body'): Observable<any> {
    if (saveNewRecipeRequest === null || saveNewRecipeRequest === undefined)  {
      throw new Error('Required parameter saveNewRecipeRequest was null or undefined when calling saveNewRecipe.');
    }

    let headers = this.defaultHeaders;

    return this.httpClient.post<any>(`${this.configuration.basePath}/${saveNewRecipeRequest.category}`,
      saveNewRecipeRequest,
      {
        headers: headers,
        observe: observe,
      }
    );
  }

  public deleteRecipe(deleteRecipeRequest: Recipe, observe?: 'body', reportProgress?: boolean): Observable<EmptyResponse>;
  public deleteRecipe(deleteRecipeRequest: Recipe, observe?: 'response'): Observable<HttpResponse<EmptyResponse>>;
  public deleteRecipe(deleteRecipeRequest: Recipe, observe?: 'events'): Observable<HttpEvent<EmptyResponse>>;
  public deleteRecipe(deleteRecipeRequest: Recipe, observe: any = 'body'): Observable<any> {
    if (deleteRecipeRequest === null || deleteRecipeRequest === undefined)  {
      throw new Error('Required parameter deleteRecipeRequest was null or undefined when calling deleteRecipe.');
    }

    let headers = this.defaultHeaders;

    return this.httpClient.delete<any>(`${this.configuration.basePath}/${deleteRecipeRequest.category}/${deleteRecipeRequest.id}`,
      deleteRecipeRequest,
      {
        headers: headers,
        observe: observe,
      }
    );
  }

  public addRecipeToFavorite(addRecipeToFavoriteRequest: Recipe, observe?: 'body', reportProgress?: boolean): Observable<EmptyResponse>;
  public addRecipeToFavorite(addRecipeToFavoriteRequest: Recipe, observe?: 'response'): Observable<HttpResponse<EmptyResponse>>;
  public addRecipeToFavorite(addRecipeToFavoriteRequest: Recipe, observe?: 'events'): Observable<HttpEvent<EmptyResponse>>;
  public addRecipeToFavorite(addRecipeToFavoriteRequest: Recipe, observe: any = 'body'): Observable<any> {
    if (addRecipeToFavoriteRequest === null || addRecipeToFavoriteRequest === undefined)  {
      throw new Error('Required parameter addRecipeToFavoriteRequest was null or undefined when calling addRecipeToFavorite.');
    }

    let headers = this.defaultHeaders;

    return this.httpClient.post<any>(`${this.configuration.basePath}/${addRecipeToFavoriteRequest.category}/${addRecipeToFavoriteRequest.id}`,
      addRecipeToFavoriteRequest,
      {
        headers: headers,
        observe: observe,
      }
    );
  }


}
