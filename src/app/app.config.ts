import {MenuConfig, MenuItem} from "./component/menu/model/menu.model";
import {UnitEnum} from "./component/recipe/model/unit.enum";
import {RecipeCategoryEnum} from "./component/recipe/model/recipe-category.enum";

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
  },
];

export const menuConfig: MenuConfig = {
  menuItemList: menuItemList,
  addRecipeMenuItem: {
      titleKey: "HEADER.MENU.TITLE.ADD.RECIPE",
      value: "add-recipe",
      path: "/add-recipe"
  }
}
export const UnitConfig: Array<UnitEnum> = [UnitEnum.G, UnitEnum.TK, UnitEnum.CS, UnitEnum.KK, UnitEnum.DB]
export const RecipeCategoryConfig: Array<RecipeCategoryEnum> = [RecipeCategoryEnum.INSERT, RecipeCategoryEnum.MOUSSE, RecipeCategoryEnum.SABLE, RecipeCategoryEnum.TUILE, RecipeCategoryEnum.SPONGECAKE]
