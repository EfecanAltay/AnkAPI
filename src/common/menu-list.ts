import { MenuItemMeta } from "./menu-item-meta";

export class MenuListMeta {
    public OnClickSidebarButton?: () => any;
    public MenuListMeta?: MenuItemMeta[] = [];
    public SelectedMenuKey?: string;
    public OnChangedSelectedMenu?: (SelectedMenuKey: string) => any;
}