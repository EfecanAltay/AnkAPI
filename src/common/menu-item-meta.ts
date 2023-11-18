import { MenuItemData } from "./menu-item";

export class MenuItemMeta {
    public MenuItemData: MenuItemData;
    public OnMouseEnter? = () => {};
    public OnMouseLeave? = () => {};
}