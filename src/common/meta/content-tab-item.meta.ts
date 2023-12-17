import { UniqueIdentifier } from "@dnd-kit/core";
import { ContentTabItem } from "../data/content-tab/content-tab-item.data";

export class ContentTabItemMeta {
    public Data?: ContentTabItem;
    public CloseAction = (id:UniqueIdentifier)=>{};
}