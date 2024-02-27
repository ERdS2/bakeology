import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ActionReducer, StoreModule} from "@ngrx/store";
import { HttpClientModule} from "@angular/common/http";
import {MenuConfigToken} from "./component/menu/model/menu.model";
import {menuConfig} from "./app.config";
import {NgrxLoggerModule} from "./core/ngrxlogger/ngrx-logger.module";
import {environment} from "../environments/environment";
import {storeLogger} from "./core/ngrxlogger/ngrx-logger.model";
import {ResourcePackage, ResourcePackageToken} from "./core/resource/resource.module";
import {resourcePackage} from "./resource.config";
import {CoreModule} from "./core/core.module";
import {MainPageModule} from "./component/mainpage/main-page.module";

export function logger(reducer: ActionReducer<any>): any {
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

export function resourcePackageFactory(): ResourcePackage {
  const resourcePackages: ResourcePackage[] = [
    resourcePackage
  ];
  let mergedResourcePackage = {};

  for (let currentPackage of resourcePackages) {
    for (let locale in currentPackage) {
      if (!mergedResourcePackage[locale]) {
        mergedResourcePackage[locale] = {};
      }
      Object.assign(mergedResourcePackage[locale], currentPackage[locale]);
    }
  }

  return mergedResourcePackage;
}
export const localeConfig = {
  availableLocales: ["hu"],
  defaultLocale: "hu"
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPageModule,
    NgrxLoggerModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot({}, {metaReducers}),
  ],
  providers: [
    { provide: MenuConfigToken, useValue: menuConfig },
    { provide: ResourcePackageToken, useFactory: resourcePackageFactory, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
