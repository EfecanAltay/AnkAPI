import React from "react";
import { ContentHeaderMeta } from "./content-header-meta";
import { ContentPageContainerInfo } from "../data/content-page-container.data";

export class ContentPageContainerMeta {
    public children?: React.JSX.Element ;
    public contentHeader?: ContentHeaderMeta;
    public ContentPageContainerInfo? : ContentPageContainerInfo;
    public ContentRender?: ()=>any;
}

