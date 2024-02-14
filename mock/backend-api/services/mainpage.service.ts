import {Inject, Injectable, Optional} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders, HttpParameterCodec, HttpResponse} from "@angular/common/http";
import { Configuration } from '../configuration';
import {BASE_PATH} from "../variables";
import {GetRecipeListRequest} from "../model/getRecipeListRequest";
import {Observable} from "rxjs";
import {GetRecipeListResponse} from "../model/getRecipeListResponse";

@Injectable({
  providedIn: 'root'
})
export class MainpageService {

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

    return this.httpClient.get<any>(`${this.configuration.basePath}/${getRecipeListRequest.recipeType}`,
      {
        headers: headers,
        observe: observe,
      }
    );
  }

//   public getRecipeList(getRecipeListRequest: GetRecipeListRequest, mNBAuthorization?: string, observe?: 'body', reportProgress?: boolean): Observable<GetRecipeListResponse>;
//   public getRecipeList(getRecipeListRequest: GetRecipeListRequest, mNBAuthorization?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GetRecipeListResponse>>;
//   public getRecipeList(getRecipeListRequest: GetRecipeListRequest, mNBAuthorization?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GetRecipeListResponse>>;
//   public getRecipeList(getRecipeListRequest: GetRecipeListRequest, mNBAuthorization?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
//     if (getRecipeListRequest === null || getRecipeListRequest === undefined) {
//       throw new Error('Required parameter getRecipeListRequest was null or undefined when calling getRecipeList.');
//     }
//
//     let headers = this.defaultHeaders;
//     if (mNBAuthorization !== undefined && mNBAuthorization !== null) {
//       headers = headers.set('MNBAuthorization', String(mNBAuthorization));
//     }
//
//     // to determine the Accept header
//     const httpHeaderAccepts: string[] = [
//       'application/json'
//     ];
//     const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
//     if (httpHeaderAcceptSelected !== undefined) {
//       headers = headers.set('Accept', httpHeaderAcceptSelected);
//     }
//
//
//     // to determine the Content-Type header
//     const consumes: string[] = [
//       'application/json'
//     ];
//     const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
//     if (httpContentTypeSelected !== undefined) {
//       headers = headers.set('Content-Type', httpContentTypeSelected);
//     }
//
//     return this.httpClient.post<GetRecipeListResponse>(`${this.configuration.basePath}/getRecipeList`,
//       getRecipeListRequest,
//       {
//         withCredentials: this.configuration.withCredentials,
//         headers: headers,
//         observe: observe,
//         reportProgress: reportProgress
//       }
//     );
//   }
}
