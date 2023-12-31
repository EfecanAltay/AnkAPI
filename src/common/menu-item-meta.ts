import { ContentMenuItem } from "./content-meta";

export class MenuItemMeta {
    public MenuItemData: ContentMenuItem;
    public OnMouseEnter? = () => {};
    public OnMouseLeave? = () => {};
    public OnShowingChanged? = (isShowng: boolean) => {};
    public OnClick? = (item: ContentMenuItem) => {};
}