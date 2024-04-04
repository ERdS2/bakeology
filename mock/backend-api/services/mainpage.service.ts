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


}
