import {MenuConfig, MenuItem} from "./component/menu/model/menu.model";

const menuItemList: MenuItem[] = [
  {
    titleKey: "mousse",
  },
  {
    titleKey: "sable",
  },
  {
    titleKey: "tuile",
  }
  // {
  //   titleKey: "header.menu.mousse.title",
  // },
  // {
  //   titleKey: "header.menu.sable.title",
  // },
  // {
  //   titleKey: "header.menu.tuile.title",
  // }
];

export const menuConfig: MenuConfig = {
  menuItemList: menuItemList
}
