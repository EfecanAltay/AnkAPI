import { ContentPageContainerInfo } from "@/common/data/content-page-container.data";

export class SidebarItemData {
    public selecteMenuKey: string = "";
    public MenuKey: string = "";
    public Name: string = "";
    public IconContent: any;
    public IsSelected: boolean = false;
    public PageContent: any;
    public ContentPageContainerInfo : ContentPageContainerInfo = new ContentPageContainerInfo();
    
    public Children : SidebarItemData[] | null = null;
    public Parent : SidebarItemData | null = null;
    public ParentIndex : number = 0;

    /**
     *
     */
    constructor() {
        this.ParentIndex = 0;
    }
}