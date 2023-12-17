import React from "react";
import { ContentHeaderMeta } from "./content-header-meta";
import { ContentTabItem } from "./content-tab-meta";
import { ContentData } from "./data/content.data";

export class ContentPageContainerMeta {
    public children?: React.JSX.Element ;
    public contentHeader?: ContentHeaderMeta;
    public ContentPageContainerInfo? : ContentPageContainerInfo;
    public ContentRender?: ()=>any;
}

export class ContentPageContainerInfo{
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
    public PageContent: any;
    public Children : ContentMenuItem[] = [];
    public haveChildren : boolean = false; 
    public ContentData : ContentData = new ContentData();

    public Selectable: boolean = false;
    public IsSelected: boolean = false;
}

export enum ContentMenuItemType{
    Directory,
    Content
}