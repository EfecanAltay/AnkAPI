import { ContentMenuItem } from "@/common/data/content-menu/content-menu.data";

export class ContentMenuListMeta {
    public ContentMenuList: ContentMenuItem[] = [];
    public SelectedMenuKey?: string;
    public OnChangedSelectedMenu?: (SelectedMenuKey: string) => any;
    public ShowContentAction?: (item: ContentMenuItem) => void;
}