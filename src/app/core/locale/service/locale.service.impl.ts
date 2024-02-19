import {Inject, Injectable} from "@angular/core";

import {LocaleService} from "./locale.service";
import {LocaleServiceConfig, LocaleServiceConfigToken} from "./locale.service.config.model";

/**
 * The default implementation of the locale service.
 */
@Injectable()
export class LocaleServiceImpl implements LocaleService {
    protected _locale!: string;
    protected _config: LocaleServiceConfig;
    protected _availableLocales: string[];

    constructor (
        @Inject(LocaleServiceConfigToken) config: LocaleServiceConfig
    ) {
        this._config = config;

        if (this._config.availableLocales.length < 1) {
            this._availableLocales = [this._locale];
        } else {
            this._availableLocales = this._config.availableLocales;
        }
        this.setLocale(this._config.defaultLocale);
    }
    /**
     * Set the active locale. All text elements will be resolved to that language after the set.
     * @param locale The two character long locale code.
     */
    public setLocale(locale: string) {
        if (this._availableLocales.indexOf(locale) === -1) {
            throw "This locale (" + locale + ") is not amongst the available locales!";
        }

        this._locale = locale;
    }
    /**
     * Return the actively used locale code.
     * @returns {string} The two character long code of the active locale.
     */
    public getLocale(): string {
        return this._locale;
    }
    /**
     * Returns the list of allowed locales.
     */
    public getAvailableLocales(): string[] {
        return this._availableLocales;
    }
}
