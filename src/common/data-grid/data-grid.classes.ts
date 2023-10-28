import exp from "constants";
import { DataGridCellMode, DataGridCellRule, DataGridCellType, DataGridValidationMode } from "./data-grid-cell.type";


export  class DataGridCell {
    public Id : string = "0";
    public Value?: number | string;
    public Type: DataGridCellType = DataGridCellType.Text;
    public Rule: DataGridCellRule = DataGridCellRule.Readonly;
    public CurrentMode: DataGridCellMode = DataGridCellMode.Read;
    public Nullable: boolean = true;
    public Validation: DataGridValidationMode = DataGridValidationMode.Normal;
  
    /**
     * DataGridCol
     */
    constructor(
      value: number | string = "",
      type: DataGridCellType = DataGridCellType.Text,
      rule: DataGridCellRule = DataGridCellRule.Readonly,
      nullable: boolean = true
    ) {
      this.Value = value;
      this.Rule = rule;
      this.Type = type;
      this.Nullable = nullable;
      this.CurrentMode = DataGridCellMode.Read;
    }
  }
  
export  class DataGridRow {
    public Id: string = "0";
    public DataGridCol: DataGridCell[] = [];
    public Mode: DataGridCellMode = DataGridCellMode.Read;
  
    /**
     * DataGridRow
     */
    constructor(
      dataGridCol: DataGridCell[] = [],
      mode: DataGridCellMode = DataGridCellMode.Read
    ) {
      this.DataGridCol = [];
      this.Mode = mode;
      this.DataGridCol = dataGridCol;
    }
}

export class DataGridColHeader extends DataGridCell {
  public Id: string = "0";
  public Width: number = 100;

  /**
   * DataGridCol
   */
  constructor(
    value: string = "",
    width: number = 100,
    type: DataGridCellType = DataGridCellType.Text
  ) {
    super(value,type)
    this.Width = width;
  }
}