import { UniqueIdentifier } from "@dnd-kit/core";
import { AnimateLayoutChanges } from "@dnd-kit/sortable";
import React from "react";

export class ContentTabMeta {
    public SelectedContentKey?: string = "";
    public contentTabList: ContentTabItem[] = [];
}

export class ContentTabItemMeta{
    public UpdateAction? = ()=>{};
    public Data? : ContentTabItem;
}

export class ContentTabItem{
    public Id: UniqueIdentifier = 0;
    public Referance :  React.Ref<ContentTabItem> =  React.useRef(null);
    public PageKey : string = "None";
    public PageName : string = "None";
    public IsSelected : boolean = false;

    public SelectCallbackAction = (item: ContentTabItem)=>{};
    public CloseCallbackAction = (item: ContentTabItem)=>{};
    
    public UpdateAction = ()=>{};
}