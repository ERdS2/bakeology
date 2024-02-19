import {Inject, Injectable} from "@angular/core";
import {ResourceMap, ResourcePackage, ResourcePackageToken} from "../model/resource.model";
import {ResourceService} from "./resource.service";
import LocaleService, {LocaleServiceToken} from "../../locale/service/locale.service";

/**
 * The default implemetation of the resource service. That collects the resource packages from Angular multi providers, based on the {@link ResourcePackageToken}.
 */
@Injectable()
export class ResourceServiceImpl implements ResourceService {
    protected _localeService: LocaleService;
    protected _resources!: ResourcePackage;
    protected _localeResources!: ResourceMap;
    protected _frontendResources: ResourcePackage[];

    constructor(
            @Inject(LocaleServiceToken)
              localeService: LocaleService,
            @Inject(ResourcePackageToken)
              resources: ResourcePackage[]) {

        this._localeService = localeService;
        this._frontendResources = resources;
        this.processResources(resources);
        this.applyLocale();
    }

  /**
   * This method resolves a resource key and replaces it a with a locale-aware text item. You can use parametrized
   * texts with named placeholders to support context-aware contents.
   * @param key The resource key to resolve.
   * @param parameters A parameter object for replacing the mustache style, named placeholders in the resolved text.
   * @param defaultValue If there is no value registered to the given resource key, this default value will be return as the result of the resolve.
   */
  public resolve(key: string, parameters?: any, defaultValue?: string): string {
    this.applyLocale();

    let template: string = "";
    if (typeof parameters === "string") {
      defaultValue = parameters;
    }

    if (this.hasKey(key)) {
      template = this._localeResources[key];
    } else {
      if (!defaultValue && defaultValue !== "") {
        return "Undefined resource: [" + key + "]";
      }

      template = defaultValue;
    }

    if (parameters) {
      return this.deMustache(template, parameters);
    }

    return template;
  }

  public canResolve(key: string): boolean {
    let template: string = this.resolve(key);
    return <String>template && template.replace(/\s/g, "").length > 0;
  }

  /**
   * Checks whether the given resource kay is registered for the actual locale.
   * @param key The target resource key.
   */
  public hasKey(key: string): boolean {
    return this._localeResources[key] !== undefined;
  }

  // merging the provided resource packages
  protected processResources(packages: ResourcePackage[]) {
    this._resources = {};

    for (let currentPackage of packages) {
      for (let locale in currentPackage) {
        if (!this._resources[locale]) {
          this._resources[locale] = {};
        }
        Object.assign(this._resources[locale], currentPackage[locale]);
      }
    }
  }

  protected applyLocale() {
    let locale: string = this._localeService.getLocale();

    if (!this._resources[locale]) {
      throw "This locale (" + locale + ") is not defined in any of our resource packages!";
    }

    this._localeResources = this._resources[locale];
  }

  // resolving mustache style named placeholders to support context-aware elements
  private deMustache(template: string, parameters: any) {
    return template.replace(/{{([^}]*)}}/g, (all, param: string) => {
      return parameters[param] || all;
    });
  }
}
