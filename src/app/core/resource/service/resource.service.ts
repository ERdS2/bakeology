import {InjectionToken} from "@angular/core";
/**
 * @type {InjectionToken<ResourceService>} Angular DI provider token for resource service implementations.
 */
export const ResourceServiceToken: InjectionToken<ResourceService> = new InjectionToken<ResourceService>("core.resourceservice");

/**
 * Simple service interface to support multilingual applications.
 */
export interface ResourceService {
    /**
     * This method resolves a resource key and replaces it a with a locale-aware text item. You can use parametrized
     * texts with named placeholders to support context-aware contents.
     * @param key The resource key to resolve.
     * @param parameters A parameter object for replacing the mustache style, named placeholders in the resolved text.
     * @param defaultValue If there is no value registered to the given resource key, this default value will be return as the result of the resolve.
     */
    resolve(key: string, parameters?: any, defaultValue?: string): string;

    /**
     * Checks whether the given resource kay is registered for the actual locale.
     * @param key The target resource key.
     */
    hasKey(key: string): boolean;

    canResolve(key: string): boolean;
}

export default ResourceService;
