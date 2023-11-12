import { MenuItemMeta } from "./menu-item";

export class SidebarMeta {
    public IsOpen: boolean = false;
    public OnClickSidebarButton?: () => any;
    public MenuListMeta?: MenuItemMeta[] = [];
    public SelectedMenuKey?: string;
    public OnChangedSelectedMenu?: (SelectedMenuKey: string) => any;
}