import { MenuItemMeta } from "./menu-item";

export class ContentMeta {
    public IsSideBarShowing?: boolean;
    public children?: any ;
    public ContentRender?: ()=>any;
}
