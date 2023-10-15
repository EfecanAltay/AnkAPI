import { MenuItemMeta } from "./menu-item-meta";

export class ContentMeta {
    public IsSideBarShowing?: boolean;
    public children?: any ;
    public ContentRender?: ()=>any;
}
