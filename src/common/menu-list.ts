import { MenuItemData } from "./menu-item";

export class MenuListMeta {
    public OnClickSidebarButton?: () => any;
    public MenuItemList: MenuItemData[] = [];
    public SelectedMenuKey?: string;
    public OnChangedSelectedMenu?: (SelectedMenuKey: string) => any;
}