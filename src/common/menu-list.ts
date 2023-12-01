import { ContentMenuItem } from "./content-meta";

export class ContentMenuListMeta {
    public MenuItemList?: ContentMenuItem[];
    public SelectedMenuKey?: string;
    public OnChangedSelectedMenu?: (SelectedMenuKey: string) => any;
    public ShowContentAction?: (item: ContentMenuItem) => void;
}