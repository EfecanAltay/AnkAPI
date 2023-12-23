export class ContentMenuItem {
    public MenuKey: string = "";
    public Name: string = "";
    public IconContent: any;
    public MenuType: ContentMenuItemType = ContentMenuItemType.Content;
    public PageContent: any;
    public Children : ContentMenuItem[] = [];
    public haveChildren : boolean = false; 
    public ContentDataId : string = "";
    public Path : string = "/";

    public Selectable: boolean = false;
    public IsSelected: boolean = false;
}

export enum ContentMenuItemType{
    Directory,
    Content
}