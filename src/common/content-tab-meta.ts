import { UniqueIdentifier } from "@dnd-kit/core";
import React from "react";

export class ContentTabMeta {
    public SelectedContentKey?: string = "";
    public contentTabList?: ContentTabItem[];
}

export class ContentTabItemMeta{
    public UpdateAction? = ()=>{};
    public CloseAction? = (id:UniqueIdentifier)=>{};
    public Data? : ContentTabItem;
}

export class ContentTabItem{
    public Id: UniqueIdentifier = 0;
    public Referance :  React.Ref<ContentTabItem>;
    public ContentKey : string = "None";
    public ContentName : string = "None";
    public IsSelected : boolean = false;
    public IsNotSaved : boolean = true;

    public SelectCallbackAction = (item: ContentTabItem)=>{};
    public CloseCallbackAction = (item: ContentTabItem)=>{};
    
    public UpdateAction = ()=>{};
}