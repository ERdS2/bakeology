import {MenuConfig, MenuItem} from "./component/menu/model/menu.model";

const menuItemList: MenuItem[] = [
  {
    titleKey: "HEADER.MENU.TITLE.MOUSSE",
    value: "mousse",
    path: "/mousse"
  },
  {
    titleKey: "HEADER.MENU.TITLE.SABLE",
    value: "sable",
    path: "/sable"
  },
  {
    titleKey: "HEADER.MENU.TITLE.TUILE",
    value: "tuile",
    path: "/tuile"
  }
];

export const menuConfig: MenuConfig = {
  menuItemList: menuItemList
}
