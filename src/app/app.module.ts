import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainPageModule} from "./component/mainpage/main-page.module";
import {StoreModule} from "@ngrx/store";
import { HttpClientModule} from "@angular/common/http";
import {MenuConfigToken} from "./component/menu/model/menu.model";
import {menuConfig} from "./app.config";
import {NgrxLoggerModule} from "./core/ngrxlogger/ngrx-logger.module";

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
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    { provide: MenuConfigToken, useValue: menuConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
