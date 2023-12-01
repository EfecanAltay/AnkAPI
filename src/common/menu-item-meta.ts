import { MenuItemData } from "./menu-item";

export class MenuItemMeta {
    public MenuItemData: ContentMenuItem;
    public OnMouseEnter? = () => {};
    public OnMouseLeave? = () => {};
    public OnShowingChanged? = (isShowng: boolean) => {};
    public OnClick? = (item: ContentMenuItem) => {};
}