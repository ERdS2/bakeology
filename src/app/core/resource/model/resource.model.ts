import {InjectionToken} from "@angular/core";

/**
 * A simple map type for storing key-value pairs of the locale specific texts. E.g.:
 *
 * ```
 * let resourceMap: ResourceMap = {
 *  "simple.function.title": "Function title",
 *  "simple.function.details": "Long function details text..."
 *  // ...
 * };
 * ```
 */
export interface ResourceMap {
    [key: string]: string;
}

/**
 * A simple type storing {@link ResourceMap}s for different languages. E.g.:
 *
 * ```
 * let resourcePackage: ResourcePackage = {
 *  "en": {
 *      "simple.function.title": "Function title",
 *      "simple.function.details": "Long function details text..."
 *      // ...
 *  },
 *  "hu": {
 *      "simple.function.title": "Funkció címe",
 *      "simple.function.details": "A funkció részleteinek hosszú leírása..."
 *      // ...
 *  }
 *  // ...
 * };
 * ```
 */
export interface ResourcePackage {
    [locale: string]: ResourceMap;
}

/**
 * @type {InjectionToken} DI provider token for resource package. The resource service will collect them based on this token.
 */
export const ResourcePackageToken: InjectionToken<ResourcePackage> = new InjectionToken<ResourcePackage>("core.resource.package");
