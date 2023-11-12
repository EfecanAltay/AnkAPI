export class MenuItemData {
    public selecteMenuKey: string = "";
    public MenuKey: string = "";
    public Name: string = "";
    public IconContent: any;
    public IsSelected: boolean = false;
    public PageContent: any;
    
    public Children : MenuItemData[] | null = null;
    public Parent : MenuItemData | null = null;
    public ParentIndex : number = 0;

    /**
     *
     */
    constructor() {
        this.ParentIndex = 0;
    }
}