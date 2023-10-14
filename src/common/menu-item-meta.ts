import { SvgIconComponent } from "@mui/icons-material";

export class MenuItemMeta {
    public MenuKey: string = "";
    public Name: string = "";
    public IconRender?: () => any;
    public IsSelected: boolean = false;
    public PageContent: any;
}