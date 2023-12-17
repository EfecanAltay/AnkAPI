export class KeyValue<K,V>{
    public key : K ;
    public val : V ;
    constructor(_key : K, _val: V) {
        this.key = _key;
        this.val = _val;
    }
}

export class Dictionary<K,V>{
    
    get(key: K) : V | undefined {
        return this._items.find(i=> i.key === i.key)?.val;
    }

    set(key: K) : V | undefined {
        const item = this.get(key)
        
        return this._items.find(i=> i.key === i.key)?.val;
    }
    
    private _items : KeyValue<K,V>[] = [];

    add(...items: KeyValue<K,V>[]): number {
        if(items)
        {
            let errMessage = this.getIdentityValidationMessage(items);
            if(errMessage !== "")
                throw Error(errMessage);
            this._items = this._items.concat(items);
            return 1;
        }
        else
            return 0;
    }

    identityValidation = (key: any) => {
        return !!this.get(key);
    }

    getIdentityValidationMessage = (items: KeyValue<K,V>[]): string => {
        let errMessage : string = "";
        items?.forEach(item=>{
            if(this.identityValidation(item.key)){
                errMessage = errMessage +   `${item.key} key is already available,\n\r` ;
            }
        });
        return errMessage;
    }

    remove = (key:any) => {
        const item = this.get(key);
        if(!item)
            throw Error (`${key} key not found.`);
        this._items = this._items.filter(i=> i.key !== key);
    }
}