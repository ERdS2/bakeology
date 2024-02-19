import {InjectionToken} from "@angular/core";

/**
 * @type {InjectionToken<LocaleService>} Angular DI provider token for locale service implementations.
 */
export const LocaleServiceToken: InjectionToken<LocaleService> = new InjectionToken<LocaleService>("core.locale.service");

/**
 * Simple service interface to handle application locales.
 */
export interface LocaleService {
    /**
     * Set the active locale. All text elements will be resolved to that language after the set.
     * @param locale The two character long locale code.
     */
    setLocale(locale: string): void;

    /**
     * Return the actively used locale code.
     * @returns {string} The two character long code of the active locale.
     */
    getLocale(): string;

    /**
     * Returns the list of allowed locales.
     */
    getAvailableLocales(): string[];
}

export default LocaleService;
