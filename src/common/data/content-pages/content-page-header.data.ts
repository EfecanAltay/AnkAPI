export class ContentPageHeader{
    public PageName : string = "New Content" ;
    public PagePath : string = "New Content" ;
    public ContentPageType: ContentPageType = 0;   
}

export enum ContentPageType{
    CreateAPIPage,
    APIListPage
}