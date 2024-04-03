import {Inject, Injectable, Optional} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders, HttpParameterCodec, HttpResponse} from "@angular/common/http";
import { Configuration } from '../configuration';
import {BASE_PATH} from "../variables";
import {Observable} from "rxjs";
import {AddRecipe} from "../../../src/app/component/add-recipe/model/add.recipe";
import {EmptyResponse} from "../../../src/app/component/add-recipe/model/empty-response.interface";

@Injectable({
  providedIn: 'root'
})
export class AddRecipeService {

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
  public saveNewRecipe(saveNewRecipeRequest: AddRecipe, observe?: 'body', reportProgress?: boolean): Observable<EmptyResponse>;
  public saveNewRecipe(saveNewRecipeRequest: AddRecipe, observe?: 'response'): Observable<HttpResponse<EmptyResponse>>;
  public saveNewRecipe(saveNewRecipeRequest: AddRecipe, observe?: 'events'): Observable<HttpEvent<EmptyResponse>>;
  public saveNewRecipe(saveNewRecipeRequest: AddRecipe, observe: any = 'body'): Observable<any> {
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


}
