import { ContentPageData } from "./content-page.data";
import { Dictionary } from "@/utils/dictionary";

export class CreateAPIPageData extends ContentPageData{
    
}

enum RestAPIType{
    GET,
    SET,
    PUT,
    UPDATE,
    DELETE
}

class APITemplate{
    public APIType : RestAPIType = RestAPIType.GET;
    public SendingURL : string = "";
    public Header : Dictionary<string,string> = new Dictionary();
}