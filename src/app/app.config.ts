import {MenuConfig, MenuItem} from "./component/menu/model/menu.model";

const menuItemList: MenuItem[] = [
  {
    titleKey: "HEADER.MENU.TITLE.MOUSSE",
    value: "mousse"
  },
  {
    titleKey: "HEADER.MENU.TITLE.SABLE",
    value: "sable"
  },
  {
    titleKey: "HEADER.MENU.TITLE.TUILE",
    value: "tuile"
  }
];

export const menuConfig: MenuConfig = {
  menuItemList: menuItemList
}
