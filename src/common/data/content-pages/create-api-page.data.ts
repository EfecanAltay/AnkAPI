import { ContentPageData } from "./content-page.data";
import { Dictionary } from "@/utils/dictionary";

export class CreateAPIPageData extends ContentPageData{
    public APITemplate : APITemplate = new APITemplate();
}

export enum RestAPIType{
    GET,
    SET,
    PUT,
    UPDATE,
    DELETE
}

export class APITemplate{
    public APIType : RestAPIType = RestAPIType.GET;
    public SendingURL : string = "";
    public Header : Dictionary<string,string> = new Dictionary();
}