import { ContentHeaderMeta } from "./content-header-meta";
import { ContentTabItem } from "./content-tab-meta";

export class ContentMeta {
    public children?: any ;
    public contentHeader?: ContentHeaderMeta;
    public ContentHeaderInfo? : ContentHeaderInfo;
    public ContentRender?: ()=>any;
}

export class ContentHeaderInfo{
    public IsHaveContentMenu: boolean = false;
    public IsHaveContentTab: boolean = false;
    public ContentMenuList? : ContentMenuItem[];
    public ShowingContentPages?: ContentTabItem[]; 
}

export class ContentMenuItem {
    public MenuKey: string = "";
    public Name: string = "";
    public IconContent: any;
    public MenuType: ContentMenuItemType = ContentMenuItemType.Content;
    public IsSelected: boolean = false;
    public PageContent: any;
    public ContentHeaderInfo : ContentHeaderInfo = new ContentHeaderInfo();
    public Children : ContentMenuItem[] = [];
    public haveChildren : boolean = false; 
}

export enum ContentMenuItemType{
    Directory,
    Content
}