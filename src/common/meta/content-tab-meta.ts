import { ContentTabItem } from "../data/content-tab/content-tab-item.data";

export class ContentTabMeta {
    public SelectedContentKey?: string = "";
    public contentTabList?: ContentTabItem[];
    public onSelectedChanged = (contentTabItem: ContentTabItem,
        fromMenu: boolean)=> {};
}