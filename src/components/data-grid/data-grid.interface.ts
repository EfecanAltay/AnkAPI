import { DataGridTableRule } from "./data-grid-cell.type";

export class IDataGrid {
    public Caption?: string;
    public ItemSource?: any[];
    public OnItemClickAction?: () => any;
    public Mode: DataGridTableRule = DataGridTableRule.Normal;

    /**
     *
     */
    constructor() {
        this.Mode = DataGridTableRule.Normal;
    }
}