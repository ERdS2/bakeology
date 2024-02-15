import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {storeLogger, LoggerOptions, LoggerFilterOption, LoggerColorsOption} from "./ngrx-logger.model";

@NgModule({
    imports: [
        CommonModule
    ]
})
class NgrxLoggerModule {
}

export {
    NgrxLoggerModule,
    storeLogger,
    LoggerOptions,
    LoggerFilterOption,
    LoggerColorsOption
};
