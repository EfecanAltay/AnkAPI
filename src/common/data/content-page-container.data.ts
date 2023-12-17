import { ContentMenuItem } from "./content-menu/content-menu.data";
import { ContentTabItem } from "./content-tab/content-tab-item.data";

export class ContentPageContainerInfo{
    public IsHaveContentMenu: boolean = false;
    public IsHaveContentTab: boolean = false;
    public ContentMenuList? : ContentMenuItem[];
    public ShowingContentPages?: ContentTabItem[]; 
}