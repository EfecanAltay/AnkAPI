import { ContentPageHeader } from "./content-page-header.data";
import { ContentData } from "../content.data";

export class ContentPageData extends ContentData{
    public ContentPageHeader : ContentPageHeader = new ContentPageHeader();
}