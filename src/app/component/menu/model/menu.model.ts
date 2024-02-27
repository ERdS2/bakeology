import { InjectionToken } from "@angular/core";

export const MenuConfigToken: InjectionToken<MenuConfig> = new InjectionToken<MenuConfig>("menu.config.model");

export interface MenuConfig {

  menuItemList: MenuItem[];

}

export interface MenuItem {
  titleKey: string
  value: string
  path: string
}
