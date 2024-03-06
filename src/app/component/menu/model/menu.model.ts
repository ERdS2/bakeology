import { InjectionToken } from "@angular/core";

export const MenuConfigToken: InjectionToken<MenuConfig> = new InjectionToken<MenuConfig>("menu.config.model");

export interface MenuConfig {

  menuItemList: MenuItem[];
  addRecipeMenuItem: MenuItem;

}

export interface MenuItem {
  titleKey: string
  value: string
  path: string
}
