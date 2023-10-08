import { MenuItemMeta } from "./menu-item-meta";

export class SidebarMeta {
    public IsOpen : boolean = false;
    public OnClickSidebarButton?: () => any;
    public MenuListMeta?: MenuItemMeta[] = [];
}