import {Inject, Pipe, PipeTransform} from "@angular/core";
import {ResourceService, ResourceServiceToken} from "../service/resource.service";

/**
 * This pipe resolves a resource key in angular templates and replaces it a with a locale-aware text item. It works like a kind of dictionary.
 *
 * @param {string} key The resource key to resolve.
 * @param {any} [parameters] A parameter object for replacing the mustache style, named placeholders in the resolved text.
 * @param {string} [defaultValue] If there is no value registered to the given resource key, this default value will be return as the result of the resolve.
 *
 */
@Pipe({
    name: "resolve",
    pure: true
})
export class ResolvePipe implements PipeTransform {
    constructor(@Inject(ResourceServiceToken) private _resource: ResourceService) {}

    transform(key: string, parameters?: any, defaultValue?: string): any {
        return this._resource.resolve(key, parameters, defaultValue);
    }
}
