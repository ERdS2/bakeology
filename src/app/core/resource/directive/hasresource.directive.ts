import {AfterContentInit, Directive, ElementRef, Inject, Input} from "@angular/core";
import {ResourceService, ResourceServiceToken} from "../service/resource.service";

@Directive({
  selector: "[hasResource]",
})
export class HasResourceDirective implements AfterContentInit {

  protected _elementRef: ElementRef;
  protected _resourceKey!: string;
  protected _resourceService: ResourceService;

  @Input()
  public set hasResource(resourceKey: string) {
    this._resourceKey = resourceKey;
  }

  constructor(elementRef: ElementRef,
              @Inject(ResourceServiceToken) resourceService: ResourceService) {
    this._elementRef = elementRef;
    this._resourceService = resourceService;
  }

  ngAfterContentInit(): void {
    if (!this._resourceService.canResolve(this._resourceKey)) {
      const el: HTMLElement = this._elementRef.nativeElement;
      if (el && el.parentElement) {
        el.parentElement.removeChild(el);
      }
    }
  }
}
