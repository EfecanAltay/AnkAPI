import { DataGridColHeader, DataGridRow } from "@/common/data-grid/data-grid.classes";
import { DataGridTableMode, DataGridTableRule } from "../../common/data-grid/data-grid-cell.type";

export class IDataGrid {
    public Caption?: string;
    public ItemSource?: any[];
    public OnItemClickAction?: () => any;
    public EditRule: DataGridTableRule = DataGridTableRule.Readonly;
    public CurrentMode: DataGridTableMode = DataGridTableMode.Read;
    public InsertRowRule: DataGridTableRule = DataGridTableRule.Readonly;
    public InsertColRule: DataGridTableRule = DataGridTableRule.Readonly;

    public ColHeaders: DataGridColHeader[] = [];
    public Rows: DataGridRow[] = [];

    /**
     *
     */
    constructor() {
        this.EditRule = DataGridTableRule.Readonly;
        this.InsertRowRule = DataGridTableRule.Readonly;
        this.InsertColRule = DataGridTableRule.Readonly;
        this.CurrentMode = DataGridTableMode.Read;
    }
}