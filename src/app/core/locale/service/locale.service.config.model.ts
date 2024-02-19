import {InjectionToken} from "@angular/core";
/**
 * @type {InjectionToken<LocaleServiceConfig>} Angular DI provider token for locale service configuration.
 */
export const LocaleServiceConfigToken: InjectionToken<LocaleServiceConfig> = new InjectionToken<LocaleServiceConfig>("core.locale.service.token");

/**
 * The type of the locale service configuration. If you would like to change the behaviour of the default locale
 * service implementation, you should provide a configuration with this type as a provider using the {@link LocalServiceConfigToken}.
 *
 * There are only two configuration options:
 * * defaultLocale: the initially active locale
 * * availableLocales: list of allowed locales
 */
export interface LocaleServiceConfig {
    defaultLocale: string;
    availableLocales: string[];
}