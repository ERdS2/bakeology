import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { LoggerOptions, LoggerFilterOption, LoggerColorsOption} from "./ngrx-logger.model";

@NgModule({
    imports: [
        CommonModule
    ]
})
class NgrxLoggerModule {
}

export {
    NgrxLoggerModule,
    LoggerOptions,
    LoggerFilterOption,
    LoggerColorsOption
};
