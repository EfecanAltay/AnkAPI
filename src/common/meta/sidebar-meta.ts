import { SidebarItemData } from "../data/sidebar-menu/sidebar-item.data";

export class SidebarMeta {
    public IsOpen: boolean = false;
    public OnClickSidebarButton?: () => any;
    public MenuListMeta?: SidebarItemData[] = [];
    public SelectedMenuKey?: string;
    public OnChangedSelectedMenu?: (SelectedMenuKey: string) => any;
}