import { ContentMenuItem } from "@/common/data/content-menu/content-menu.data";

export interface IContentTab
{
    ShowOnContentMenuItem: (item : ContentMenuItem) => void; 
}